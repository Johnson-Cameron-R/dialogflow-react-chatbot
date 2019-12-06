const firebase = require("firebase");
const firebase_tools = require("firebase-tools");
const firebaseConfig = require("../config/firebaseConfig");

const deleteChatroom = (req, res) => {
  const { user } = req.body;
  firebase_tools.firestore.delete(`chatbot/${user}/convs`, {
    project: firebaseConfig.projectId,
    recursive: true,
    yes: true
  });
  then(() => res.send("success"));
};

module.exports = deleteChatroom;
