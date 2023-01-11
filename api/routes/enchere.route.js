const { authJwt } = require("../middleware");
const enchereController = require("../controller/enchere.controller");

module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
    );
    next();
  });

  app.get("/api/enchere/articleId/:articleId",enchereController.getDerniereOffre);
};