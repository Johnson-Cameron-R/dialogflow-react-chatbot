import React, { Fragment } from "react";
import "./App.css";
import NavBot from "../NavBot/NavBot.jsx";
import WeatherBot from "../WeatherChatbot/WeatherBot";
import Chat from "../FirebaseChatbot/Interface/Chat";

const App = () => (
  <Fragment>
    <WeatherBot></WeatherBot>
    <NavBot></NavBot>
    <Chat></Chat>
  </Fragment>
);

export default App;
