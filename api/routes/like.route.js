const { authJwt } = require("../middleware");
const likeController = require("../controller/like.controller");

module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
    );
    next();
  });

  app.get('/api/likes/article/:articleId', [authJwt.verifyToken, authJwt.isAcheteur], likeController.isArticleLikedByUser);
  app.post('/api/likes/create/:articleId', [authJwt.verifyToken, authJwt.isAcheteur], likeController.createLike);
  app.delete('/api/likes/remove/:articleId', [authJwt.verifyToken, authJwt.isAcheteur], likeController.removeLike);


};

