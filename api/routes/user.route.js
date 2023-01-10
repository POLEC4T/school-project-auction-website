const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");

module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/vendeur",
    [
        authJwt.verifyToken,
        authJwt.isVendeur
    ],
    controller.vendeurBoard
  );

  app.get(
    "/api/test/acheteur",
    [authJwt.verifyToken, authJwt.isAcheteur],
    controller.acheteurBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
