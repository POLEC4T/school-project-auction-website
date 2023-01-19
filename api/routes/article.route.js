const { authJwt } = require("../middleware");
const articleController = require("../controller/article.controller");
const imageController = require("../controller/image.controller");

module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/article/:id/images", imageController.getArticleImagesByArticleId);

  app.get("/api/article/:id/likes", articleController.getNbLikeArticle);
  
  app.get("/api/article/:id",articleController.getArticle);

  app.post("/api/article", [authJwt.verifyToken, authJwt.isVendeur], articleController.createArticle);

  app.put("/api/article/:id/statut", articleController.updateStatutArticle);

  app.put("/api/article/:id/dateLivraison", articleController.updateDateLivraisonArticle);

  app.get('/api/user/likedarticles', [authJwt.verifyToken, authJwt.isAcheteur], articleController.getLikedArticles);

};