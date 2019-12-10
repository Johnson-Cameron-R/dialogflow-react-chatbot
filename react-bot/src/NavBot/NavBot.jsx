import React from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";
import { Link } from "react-router-dom";

const Navbot = () => {
  const config = {
    headerTitle: "Navigation Bot",
    placeholder: "I don't accept input here!",
    floating: true,
    botDelay: 750,
    recognitionEnable: true,
    userDelay: 500
  };

  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#EF6C00",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#EF6C00",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a"
  };

  const steps = [
    {
      id: "1",
      message: "What page would you like to see?",
      trigger: "2"
    },
    {
      id: "2",
      options: [
        { value: 1, label: "Home", trigger: "3" },
        { value: 2, label: "WeatherBot", trigger: "4" },
        { value: 3, label: "ChatBot", trigger: "5" },
        { value: 4, label: "PizzaBot", trigger: "6" }
      ]
    },
    {
      id: "Again",
      message: "Would you like to go somewhere else?",
      trigger: "Again-options"
    },
    {
      id: "Again-options",
      options: [
        { value: 1, label: "Yes", trigger: "1" },
        { value: 2, label: "No", trigger: "Done" }
      ]
    },
    {
      id: "3",
      component: <Link to="/">Home</Link>,
      trigger: "Again"
    },
    {
      id: "4",
      component: <Link to="/weatherbot">WeatherBot</Link>,
      trigger: "Again"
    },
    {
      id: "5",
      component: <Link to="/chatbot">ChatBot</Link>,
      trigger: "Again"
    },
    {
      id: "6",
      component: <Link to="/pizzabot">PizzaBot</Link>,
      trigger: "Again"
    },
    {
      id: "Done",
      message: "Enjoy!",
      end: true
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} {...config} />
    </ThemeProvider>
  );
};

export default Navbot;
