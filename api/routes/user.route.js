const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");

module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
    );
    next();
  });

  app.get("/api/vendre", [authJwt.verifyToken, authJwt.isVendeur], (req,res) => {
    res.json({ message: "Mise en ligne d'un article. Accès autorisé car vous avez le rôle vendeur" });
  });
};
