import React, { useState, useEffect, useContext } from "react";
import Messages from "./Messages";
import FormInput from "./FormInput";
import Header from "./Header";
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
  measurementId: "G-J7T6XCEDDV"
};

firebase.initializeApp(firebaseconfig);

function randomName() {
  const adjectives = [
    "autumn",
    "hidden",
    "bitter",
    "misty",
    "silent",
    "empty",
    "dry",
    "dark"
  ];

  const nouns = [
    "waterfall",
    "river",
    "breeze",
    "moon",
    "rain",
    "wind",
    "sea",
    "morning",
    "snow",
    "lake",
    "sunset",
    "pine",
    "shadow"
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

const Chat = props => {
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
    id: 2
  });

  const [chatroom, setChatroom] = useState("Default");

  // const { user } = useContext();

  const onSendMessage = async message => {
    try {
      await fetch("http://localhost:5000/chatfirebase", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          User: "User",
          "Given-Name": "Someone",
          Chatroom: chatroom
        },
        body: JSON.stringify({ message: message })
      });
    } catch (error) {
      console.error(error);
    }
  };

  // const styles = () => {
  //   if (!props.isOpen) {
  //     return { right: "-300px", overflow: "hidden" };
  //   } else return {};
  // };

  useEffect(() => {
    // if (!user || user.preferred_username === "") return;
    const unsubscribe = firebase
      .firestore()
      .collection("chatbot")
      .doc("user")
      .collection(chatroom)
      .orderBy("timestamp")
      .onSnapshot(snapShot => {
        let hotmessages = [];
        snapShot.docs.forEach(snapShot => {
          hotmessages = [
            ...hotmessages,
            { uid: snapShot.id, ...snapShot.data() }
          ];
        });
        setMessages(hotmessages);
      });

    return () => unsubscribe();
  }, []);

  return (
    <div className="Chat">
      <Header onClick={props.onClick} chatroom={chatroom} />
      <Messages messages={messages} currentMember={member} />
      <FormInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default Chat;
