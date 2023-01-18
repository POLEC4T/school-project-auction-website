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

async function addEnchere(montant, userId, articleId){
      // d'abord, on crée une transaction:
      const t = await db.sequelize.transaction();

      try {
  
        //on récupère la dernière enchère
        const lastEnchere = await db.encheres.findOne({
          where: {
            articleId: articleId
          },
          order: [
            ['createdAt', 'DESC']
          ],
          transaction: t
        });

        //on vérifie que le montant de l'enchère est supérieur à la dernière enchère
        if(montant <= lastEnchere.montant){
          throw new Error('Le montant de l\'enchère doit être supérieur à la dernière enchère');
        }

        //on vérifie que l'utilisateur a un solde suffisant
        const user = await db.users.findOne({
          where: {
            id: userId
          },
          transaction: t
        });

        if(montant > user.solde){
          throw new Error('Vous n\'avez pas assez d\'argent sur votre compte');
        }
          //on ajoute l'enchère en base de données
          const enchere = await db.encheres.create({
            montant: montant,
          }, { transaction: t });

          //on ajoute l'association entre l'enchère et l'utilisateur
          await enchere.setUser(userId, { transaction: t });

          //on ajoute l'association entre l'enchère et l'article
          await enchere.setArticle(articleId, { transaction: t });

        // Si l'exécution arrive jusqu'ici, la transaction a été validée
        // et les modifications apportées à la base de données seront définitives.
        await t.commit();
        return montant;
  
      } catch (error) {
  
        //Si une erreur est survenue, annule la transaction.
        console.log(error);
        await t.rollback();
        throw error;
  }
}

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

  const ip = req.socket.remoteAddress;
  console.log('New client connected');
  clients[ip] = ws;
  ws.on('message', (message) => {
    console.log('received: %s', message);
    //On rentre la nouvelle enchère en base de données
    //on met en place une transaction pour la prog concurrente
    addEnchere(message.toString(), ws.clientId, ws.articleId).then((message) => {
      console.log('Enchère ajoutée en base de données');
      //on envoie le message à tous les clients qui sont connectés à cet article
      for (let key in clients) {
        console.log('client id: %s', clients[key].clientId);
        if (clients[key].articleId === ws.articleId) {
          console.log('send to client: %s', message.toString());
          clients[key].send(message.toString());
        }
      }
    }).catch((err) => {
      console.log(err);
    });
  });
  ws.on('close', () => {
    console.log('Client disconnected');
    delete clients[ip];
  });
  }
);