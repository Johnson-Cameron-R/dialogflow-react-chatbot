require("dotenv").config({ path: "variables.env" });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const processMessage = require("./services/process-message");
const processMessageFirebase = require("./services/process-message-firebase");
// const deleteChatroom = require("./services/delete-chatroom");
// const createChatroom = require("./services/create-chatroom");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/chat", (req, res) => {
  const { message } = req.body;
  processMessage(message, res);
});

app.post("/chatfirebase", (req, res) => {
  processMessageFirebase(req, res);
});

// app.post("/chat", (req, res) => {
//   const { message } = req.body;
//   processMessage(message, res);
// });

// app.post("/delete", (req, res) => {
//   deleteChatroom(req, res);
//   res.send("success");
// });

// app.post("/create", (req, res) => {
//   createChatroom(req, res);
// });

app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
