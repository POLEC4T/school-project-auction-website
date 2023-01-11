const { authJwt } = require("../middleware");
const enchereController = require("../controller/enchere.controller");

module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/enchere/articleId/:articleId", (req, res) => {
    enchereController.getDerniereOffre(req.params.articleId).then(data => res.json(data));
  });
};