import React, { Component } from "react";
import Pusher from "pusher-js";
import "./App.css";
import ChatBot from "react-simple-chatbot";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: "",
      conversation: []
    };
  }

  componentDidMount() {
    const pusher = new Pusher("d59ffce4898921421b72", {
      cluster: "us2",
      useTLS: true
    });

    const channel = pusher.subscribe("bot");
    channel.bind("bot-response", data => {
      const msg = {
        text: data.message,
        user: "ai"
      };
      this.setState({
        conversation: [...this.state.conversation, msg]
      });
    });
  }

  handleChange = event => {
    this.setState({ userMessage: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.userMessage.trim()) return;

    const msg = {
      text: this.state.userMessage,
      user: "human"
    };

    this.setState({
      conversation: [...this.state.conversation, msg]
    });

    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: this.state.userMessage
      })
    }).catch(error => console.error(error));
    this.setState({ userMessage: "" });
  };

  render() {
    const ChatBubble = (text, i, className) => {
      return (
        <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
          <span className="chat-content">{text}</span>
        </div>
      );
    };

    const chat = this.state.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user)
    );

    const steps = [
      {
        id: "0",
        message: "Welcome to react chatbot!",
        trigger: "1"
      },
      {
        id: "1",
        message: "Bye!",
        end: true
      }
    ];

    return (
      <div>
        <h1>React Chatbot</h1>
        <div className="chat-window">
          <div className="conversation-view">{chat}</div>
          <div className="message-box">
            <form onSubmit={this.handleSubmit}>
              <input
                value={this.state.userMessage}
                onInput={this.handleChange}
                className="text-input"
                type="text"
                autoFocus
                placeholder="Type your message and hit Enter to send"
              />
            </form>
          </div>
        </div>
        <ChatBot
          steps={steps}
          headerTitle="Navigation Bot"
          floating="true"
          botDelay="0"
          recognitionEnable={true}
          userDelay="0"
        />
      </div>
    );
  }
}

export default App;
