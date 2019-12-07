import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import NavBot from "../NavBot/NavBot.jsx";
import WeatherBot from "../WeatherChatbot/WeatherBot";
import Chat from "../FirebaseChatbot/Interface/Chat";

const App = () => (
  <Router>
    <div>
      <h1>Senior Project</h1>
      <NavBot />
    </div>
    <Switch>
      <Route path="/weatherbot">
        <WeatherBot />
      </Route>
      <Route path="/chatbot">
        <Chat />
      </Route>
    </Switch>
  </Router>
);

export default App;
