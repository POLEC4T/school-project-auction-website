const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const cors = require('cors');

const userController = require("./controller/user.controller");

const app = express();
const port = 3080;

const db = require("./config/db.config").connect();
db.sequelize.sync();


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "ui", "build")));
app.use(cors({ origin: true, credentials: true }));

//routes
app.get("/api", (req, res) => {
  res.json({ message: "L'API marche bien !" });
});

app.get("/api/users", (req, res) => {
  userController.getUsers().then((data) => res.json(data));
});

app.get("/api/users/:login", (req, res) => {
  userController.getUser(req.params.login).then((data) => res.json(data));
});

require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/article.route")(app);

//utile pour la mise en production
//cas où la route n'est pas un endpoint de l'API -> accès au frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port  ${port}`);
});
