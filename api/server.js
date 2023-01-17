const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const cors = require('cors');

const userController = require("./controller/user.controller");

const app = express();
const port = process.env.PORT || 3080;

const db = require("./config/db.config").connect();
db.sequelize.sync({force: false});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, "..", "ui", "build")));
app.use(cors({ origin: true, credentials: true }));

//routes
app.use('/images', express.static('images'));

app.get("/api", (req, res) => {
  res.json({ message: "L'API marche bien !" });
});

app.get("/api/users", userController.getUsers);

app.get("/api/users/:login", userController.getUserByLogin);


require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/article.route")(app);
require('./routes/enchere.route')(app);
require('./routes/accueil.route')(app);
require('./routes/images.route')(app);

//utile pour la mise en production
//cas où la route n'est pas un endpoint de l'API -> accès au frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port  ${port}`);
});


///////SERVER WEBSOCKET///////
const {WebSocketServer} = require('ws');
const http = require('http');
const Url = require('url');

const server = http.createServer(app);
const wsServer = new WebSocketServer({server});
const portws = 8000;
server.listen(portws, () => {
  console.log(`Websocket server listening on port  ${portws}`);
}
);

const clients = {};

wsServer.on('connection', (ws, req) => {
  const params = Url.parse(req.url, true).query;
  ws.id = params.id;//on récupère l'id de l'article dans la query string
  const ip = req.socket.remoteAddress;
  console.log('New client connected');
  clients[ip] = ws;
  ws.on('message', (message) => {
    console.log('received: %s', message);
    //on envoie le message à tous les clients qui sont connectés à cet article
    for (let key in clients) {
      if (clients[key].id === ws.id) {
        console.log('send to client: %s', message.toString());
        clients[key].send(message.toString());
      }
    }
  });
  ws.on('close', () => {
    console.log('Client disconnected');
    delete clients[ip];
  });
  }
);