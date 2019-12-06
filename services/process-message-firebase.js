const Dialogflow = require("dialogflow");
const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyC4NYNFgv8WK-o8JYZL8147-W80IGn2ZS8",
  authDomain: "fir-chatbot-7dbd3.firebaseapp.com",
  databaseURL: "https://fir-chatbot-7dbd3.firebaseio.com",
  projectId: "fir-chatbot-7dbd3",
  storageBucket: "fir-chatbot-7dbd3.appspot.com",
  messagingSenderId: "234623852447",
  appId: "1:234623852447:web:f07b4c9f7a6d15c748a7aa",
  measurementId: "G-J7T6XCEDDV"
};
const firebase_tools = require("firebase-tools");
const app = firebase.initializeApp(firebaseConfig);

const projectId = "agent-1-fdllqh";
const sessionId = "123456";
const languageCode = "en-US";

const config = {
  credentials: {
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDIllna3bjNATGK\nbstnpaIj+rNtc2BUUA8c0H5/fvJxhc8PsqL2uV5oMXOghKpy0aN6GuF2AzkYJEAh\nEeJKxLCb8igSpAK7TCn2PPCU0CViGb0fPNvoEhL+ao1ovZUMtEEaR7j+QFjaAZ4d\ni7CtAO+4EsWiDtSpm0xjQSQyu9n6gsWnho7wIKkdk44qCu5fkYuggkwRaiFJFWxN\neuurUCMdGknbRXwKJkKEG3XJecwDiJvIIk4hYVdM3iOVOjxsTUfdt3dNfyVhwtIm\nbGW2KpaK0tWccA/TP8D/BdsASVX8+b/cxKwmDTM95CQZ7TM7hmxJiBPNap5N94AO\n3nVw/aLlAgMBAAECggEAAMWD8iGnsrwrhgeKkesTGQB/clnprTFYpDOmGj9GrJ/x\n4wgndHupN2KMpLmrPoFRbRMPj8i6jmih9C6cLaLyNfYEEvGdZBM1LHIMD9p5cQDo\nghIAcN+plzUZjFABs9iOpoyk6MTJGAo+Yt6KbwPsUsuEW0JOLZqAEaKqwmTdarIB\nKnj9x0tyb12J8EiurdpqrdhVESySJsY1Sjix9hUT53epAIbBVAN8RgMPL8a49g/H\n96DYPVy+cDWKSvbWnpzZzf2udDwyQ4JhimmRTOl722lnvpxYM+kzhRI6QpBg5BD9\n6qRzviQ9ITrHYr4sPmvtp2O30uOF4D/mWfSiiLbmGQKBgQDlt3Ypezu1Sm0YnqbZ\n/aGp9dk4JWclJGWWG1rWMx8/PTeooeIApreEaQcN0YmppD42rruR0rscFtbl0ZCC\nCa/8rUbqSto9Ad0/b/XDCYUxxJo6Dp563oPbQywvlFVh4GloxnsRVZlqMq+F5/bx\nOn+KQoNcdi6bFUEjDxUltaGi2QKBgQDfiaxzC46nAPXplJPDRdPr5QrT78Ow5Zy6\n7rEewCt81hZ0AzghfoiZ4znHguevKKDwqIdzkh1WFfneNvZmkYdKKkahkzSbfiGb\nuVDCg+e5AC3JJv1az5hW29ekBE/nz9cw8+SBlaeOWA5VZJg/4IYr7GfwBIoGVHG2\nQmcRmTzg7QKBgQCD5D4XuwWhJUZWKGEsMA+uAdXiAreh/6/D65jP+zIpoQBf9fJI\n5W/gulyudmxP1llSFCjlpNSBYCuqcBREVUOSE/rvcmKzPGrHjYTRopmy5WqXguVD\nLpcOQRcRil0rgSmEWtE2NquK6ecVPwXtouSvgVjisYg4yo9HjdVafVp8oQKBgApe\neIFdp+BXSxDqs2/7bTkkBryOAqXSANMq/0xN3baMt73p6FClbfC1eZinmdemKtD/\nAEl8HaBApLaKFiPr3Dq0e1JDYc1UrHpsvjJHrBgIyhbqmBX+SzK8P+R7zrkSCwla\nRt878enIa+HKKMXNxGuFK80WaNCiWiP6MI3AbfKBAoGAawnCIvUAhsYBjUzEIqFN\nSTaZtL/LXfU4WXbiBx6oaKlWBGSkA2YBzQVFEHPdtB8Q8PQb6CpsvG1FzaCsaNrQ\nG16/m2paSxWmzzNzpHcUeFflJVFqzUj3unIGRTQ06yR75V5WBY7WyfpkgmT2b6TF\nqVtq6p3LevmQ+pPVhOWaet4=\n-----END PRIVATE KEY-----\n",
    client_email: "dialogflow-fevqgx@agent-1-fdllqh.iam.gserviceaccount.com"
  }
};

const sessionClient = new Dialogflow.SessionsClient(config);
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessageFirebase = (req, res) => {
  const name = "User";
  // const givenName = req.headers["given-name"];
  const chatroom = req.headers.chatroom;
  const { message } = req.body;
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode
      }
    }
  };

  let data = {
    name: "User",
    message: message,
    timestamp: new Date()
  };

  updateFirebase(data, name, chatroom);
  sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;
      console.log(result);
      res.send(result);
      let data = {
        name: "Helper Bot",
        message: result.fulfillmentText,
        timestamp: new Date()
      };
      updateFirebase(data, name, chatroom);
    })
    .catch(err => {
      console.error("ERROR:", err);
      res.send(err);
    });
};

module.exports = processMessageFirebase;

function updateFirebase(data, name, room) {
  let setDoc = firebase
    .firestore()
    .collection("chatbot")
    .doc(name)
    .collection(room)
    .add(data);
}
