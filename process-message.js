const Dialogflow = require("dialogflow");
const Pusher = require("pusher");
const getWeatherInfo = require("./weather");

// You can find your project ID in your Dialogflow agent settings
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
  encrypted: true
});

const sessionClient = new Dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessage = async (message, res) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode
      }
    }
  };

  let resMessage = "";
  try {
    let responses = await sessionClient.detectIntent(request);
    // .then(responses => {
    const result = responses[0].queryResult;

    // If the intent matches 'detect-city'
    if (result.intent.displayName === "detect-city") {
      const city = result.parameters.fields["geo-city"].stringValue;

      // fetch the temperature from openweather map
      let temperature = await getWeatherInfo(city);
      resMessage = `The weather is ${city} is ${temperature}°C`;
      pusher.trigger("bot", "bot-response", {
        message: resMessage
      });
    }

    pusher.trigger("bot", "bot-response", {
      message: result.fulfillmentText
    });
    res.send({
      message: resMessage
    });
  } catch (error) {
    res.status(500).send({
      message: error
    });
  }
};

module.exports = processMessage;
