const { authJwt } = require("../middleware");
const userController = require("../controller/user.controller");


module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/vendre", [authJwt.verifyToken, authJwt.isVendeur], (req,res) => {
    res.json({ message: "Mise en ligne d'un article. Accès autorisé car vous avez le rôle vendeur" });
  });



  app.get('/api/users', (req, res) => {
    userController.getUsers().then(data => res.json(data));
  });

  app.get('/api/users/login/:login', (req, res) => {
      userController.getUserByLogin(req.params.login).then(data => res.json(data));
  });

  app.get('/api/users/id/:id', (req, res) => {
    userController.getUserById(req.params.id).then(data => res.json(data));
  });


};
