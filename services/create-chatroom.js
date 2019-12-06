const firebase = require("firebase");
const firebaseConfig = require("../config/firebaseConfig");

const createChatroom = (req, res) => {
  const name = req.headers.name;
  const chatName = req.headers["chat-name"];

  let data = {
    name: "Help Bot",
    message: `${chatName} created!`,
    timestamp: new Date()
  };

  let setDoc = firebase
    .firestore()
    .collection("chatbot")
    .doc(name)
    .collection(chatName)
    .add(data);

  res.send(`Chatroom ${chatName} created for user ${name}`);
};

module.exports = createChatroom;
