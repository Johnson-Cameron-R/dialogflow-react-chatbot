import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const PizzaChatbot = props => {
  const config = {
    width: "400px",
    height: "600px",
    userDelay: 0,
    placeholder: "Type your response here..."
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
      id: "Greet",
      message: "Would you like help building your pizza?",
      trigger: "Yes/No"
    },
    {
      id: "Yes/No",
      options: [
        {
          value: true,
          label: "Yes",
          trigger: "Asking for Tomatoes in Pizza"
        },
        {
          value: "false",
          label: "No",
          trigger: "Done"
        }
      ]
    },
    {
      id: "Asking for Tomatoes in Pizza",
      message: "Would you like to have tomatoes in your pizza",
      trigger: "Adding Tomatoes in Pizza"
    },
    {
      id: "Adding Tomatoes in Pizza",
      options: [
        {
          value: true,
          label: "Yes",
          trigger: () => {
            props.eventHandler("tomato");
            return "Asking for Mushroom in Pizza";
          }
        },
        {
          value: "false",
          label: "No",
          trigger: "Asking for Mushroom in Pizza"
        }
      ]
    },

    {
      id: "Asking for Mushroom in Pizza",
      message: "Would you like to have mushroom in your pizza",
      trigger: "Adding Mushroom in Pizza"
    },

    {
      id: "Adding Mushroom in Pizza",
      options: [
        {
          value: true,
          label: "Yes",
          trigger: () => {
            props.eventHandler("mushroom");
            return "Asking for Corn in Pizza";
          }
        },
        {
          value: "false",
          label: "No",
          trigger: "Asking for Corn in Pizza"
        }
      ]
    },
    {
      id: "Asking for Corn in Pizza",
      message: "Would you like to have corn in your pizza",
      trigger: "Adding Corn in Pizza"
    },

    {
      id: "Adding Corn in Pizza",
      options: [
        {
          value: true,
          label: "Yes",
          trigger: () => {
            props.eventHandler("corn");
            return "Asking for Veggies in Pizza";
          }
        },
        {
          value: "false",
          label: "No",
          trigger: "Asking for Veggies in Pizza"
        }
      ]
    },

    {
      id: "Asking for Veggies in Pizza",
      message: "Would you like to have veggies in your pizza",
      trigger: "Adding Veggies in Pizza"
    },

    {
      id: "Adding Veggies in Pizza",
      options: [
        {
          value: true,
          label: "Yes",
          trigger: () => {
            props.eventHandler("veggie");
            return "Done";
          }
        },
        {
          value: "false",
          label: "No",
          trigger: "Done"
        }
      ]
    },
    {
      id: "Done",
      message: "Have a great day !!",
      end: true
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} {...config} />;
    </ThemeProvider>
  );
};

export default PizzaChatbot;
