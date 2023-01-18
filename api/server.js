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


///////SERVEUR WEBSOCKET///////
const {WebSocketServer} = require('ws');
const http = require('http');
const Url = require('url');
const jwt = require('jsonwebtoken');

const server = http.createServer(app);
const wsServer = new WebSocketServer({server});
const portws = 8000;
server.listen(portws, () => {
  console.log(`Websocket server listening on port  ${portws}`);
}
);

const clients = {};
const secret = require('./auth/secret');
const wsController = require('./controller/websocket.controller');

// Generates unique userid for every user.
const generateUniqueID = () => {

	const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

	return s4() + '-' + s4() + '-' + s4();
};

wsServer.on('connection', (ws, req) => {
  const params = Url.parse(req.url, true).query;
  ws.articleId = params.id;//on récupère l'id de l'article dans la query string

  const token = params.token;
  //on vérifie que le token est valide
  //si oui on ajoute le client à la liste des clients connectés à cet article
  //sinon on ferme la connexion
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      ws.close();
    }
    else{
      ws.clientId = decoded.id;
    }
  });

  const uid = generateUniqueID();
  console.log('New client connected');
  clients[uid] = ws;
  console.log('clients: %s', Object.keys(clients));
  ws.on('message', (message) => {
    console.log('received: %s', message);
    //On rentre la nouvelle enchère en base de données
    //on met en place une transaction pour la prog concurrente
    wsController.addEnchere(message.toString(), ws.clientId, ws.articleId)
    .then((message) => {
      console.log('Enchère ajoutée en base de données');
      //on envoie le message à tous les clients qui sont connectés à cet article
      for (let key in clients) {
        console.log('client id: %s', clients[key].clientId);
        if (clients[key].articleId === ws.articleId) {
          console.log('send to client: %s', message.toString());
          clients[key].send(JSON.stringify({prix : message.toString()}));
        }
      }
    }).catch((err) => {
      console.log(err);
      ws.send(JSON.stringify({error : err.message}));
    });
  });
  ws.on('close', () => {
    console.log('Client disconnected');
    delete clients[uid];
  });
  }
);