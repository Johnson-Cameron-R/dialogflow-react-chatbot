const Dialogflow = require("dialogflow");
const Pusher = require("pusher");
const getWeatherInfo = require("./weather");

// Dialogflow agent settings
const projectId = "weather-1-ljqlrs";
const sessionId = "123456";
const languageCode = "en-US";

const config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
  }
};

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true
});

const sessionClient = new Dialogflow.SessionsClient(config);
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessage = (message, res) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode
      }
    }
  };

  sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;

      // If the intent matches 'detect-city'
      if (result.intent.displayName === "detect-city") {
        const city = result.parameters.fields["geo-city"].stringValue;

        // fetch the temperature from openweather map
        return getWeatherInfo(city).then(temperature => {
          return pusher.trigger("bot", "bot-response", {
            message: `The weather in ${city} is ${temperature}°F`
          });
        });
      }

      return pusher.trigger("bot", "bot-response", {
        message: result.fulfillmentText
      });
    })
    .catch(err => {
      console.error("ERROR:", err);
      res.send(err);
    });
};

module.exports = processMessage;
