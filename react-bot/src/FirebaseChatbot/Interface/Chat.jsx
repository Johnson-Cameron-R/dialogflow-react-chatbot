import React, { useState, useEffect } from "react";
import Messages from "./Messages";
import Input from "./Input";
import "./Chat.css";

import firebase from "firebase/app";
import "@firebase/analytics";
import "@firebase/messaging";
import "@firebase/firestore";

const firebaseconfig = {
  apiKey: "AIzaSyC4NYNFgv8WK-o8JYZL8147-W80IGn2ZS8",
  authDomain: "fir-chatbot-7dbd3.firebaseapp.com",
  databaseURL: "https://fir-chatbot-7dbd3.firebaseio.com",
  projectId: "fir-chatbot-7dbd3",
  storageBucket: "fir-chatbot-7dbd3.appspot.com",
  messagingSenderId: "234623852447",
  appId: "1:234623852447:web:f07b4c9f7a6d15c748a7aa",
  measurementId: "G-J7T6XCEDDV",
};

firebase.initializeApp(firebaseconfig);

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [member] = useState({
    // username: randomName(),
    // color: randomColor(),
    id: 2,
  });

  const [chatroom, setChatroom] = useState("Default");

  const onSendMessage = async (message) => {
    try {
      await fetch("http://localhost:5000/chatfirebase", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          User: "User",
          "Given-Name": "Someone",
          Chatroom: chatroom,
        },
        body: JSON.stringify({ message: message }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("chatbot")
      .doc("User")
      .collection(chatroom)
      .orderBy("timestamp")
      .onSnapshot((snapShot) => {
        let hotmessages = [];
        snapShot.docs.forEach((snapShot) => {
          hotmessages = [
            ...hotmessages,
            { uid: snapShot.id, ...snapShot.data() },
          ];
        });
        setMessages(hotmessages);
      });
    return () => unsubscribe();
  });

  return (
    <div className="Chat">
      <div className="Chat-header">
        <h1 className="Chat-title">Small Talk Bot</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
};

export default Chat;
