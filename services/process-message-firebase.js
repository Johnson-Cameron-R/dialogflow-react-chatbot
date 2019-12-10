const firebaseConfig = require("../config/firebaseConfig");

const Dialogflow = require("dialogflow");
const firebase = require("firebase");
const firebase_tools = require("firebase-tools");
const app = firebase.initializeApp(firebaseConfig);

const projectId = "agent-1-fdllqh";
const sessionId = "123456";
const languageCode = "en-US";

const config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_FIREBASE_PRIATE_KEY,
    client_email: process.env.DIALOGFLOW_FIREBASE_CLIENT_EMAIL
  }
};

const sessionClient = new Dialogflow.SessionsClient(config);
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessageFirebase = (req, res) => {
  const name = "User";
  // const givenName = req.headers["given-name"];
  const chatroom = req.headers.chatroom;
  const { message } = req.body;

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode
      }
    }
  };

  let data = {
    name: "User",
    message: message,
    timestamp: new Date()
  };

  updateFirebase(data, name, chatroom);
  sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;
      console.log(result);
      res.send(result);
      let data = {
        name: "Helper Bot",
        message: result.fulfillmentText,
        timestamp: new Date()
      };
      updateFirebase(data, name, chatroom);
    })
    .catch(err => {
      console.error("ERROR:", err);
      res.send(err);
    });
};

module.exports = processMessageFirebase;

function updateFirebase(data, name, room) {
  let setDoc = firebase
    .firestore()
    .collection("chatbot")
    .doc(name)
    .collection(room)
    .add(data);
}
