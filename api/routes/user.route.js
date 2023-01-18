const { authJwt } = require("../middleware");
const userController = require("../controller/user.controller");


module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
    );
    next();
  });

  app.get("/api/vendre", [authJwt.verifyToken, authJwt.isVendeur], (req,res) => {
    res.send({ message: "Mise en ligne d'un article. Accès autorisé car vous avez le rôle vendeur" });
  });

  app.get("/api/profil", [authJwt.verifyToken], userController.getProfileInfos);


  // Routes Test

  app.put('/api/users/:id/solde', userController.updateSolde);
  
  app.get('/api/users', userController.getUsers);

  app.get('/api/users/login/:login', userController.getUserByLogin);

  app.get('/api/users/id/:id', userController.getUserById);

  app.get('/api/users/:id/encheregagnee', userController.getArticlesWonbyUserId);


};
