const logger = require("../logger/api.logger");
const articleRepository = require("../repository/article.repository");
const jwt = require("jsonwebtoken");
const secret = require("../auth/secret");
class TodoController {
  getArticle = (req,res) => {
    logger.info("ArticleController: getArticle");
    articleRepository.getArticle(req.params.id).then((article) => {
      if(!article){
        return res.status(404).send({message: "Article non trouvé"});
      }
      return res.status(200).send(article);
    }
    )
  };

  getNbLikeArticle = (req,res) => {
    logger.info("ArticleController: getNbLikeArticle");
    articleRepository.getNbLikeArticle(req.params.id).then((nbLike) => {
      if(!nbLike){
        return res.status(404).send({message: "Article non trouvé"});
      }
      return res.send({nb: nbLike});
    }
    )
  };

  createArticle = (req,res) => {
    let token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.decode(token, secret);
    const id = decoded.id;
    logger.info("ArticleController: createArticle");
    const article = {
      titre: req.body.data.titre,
      description: req.body.data.description,
      categorie: req.body.data.categorie,
      taille: req.body.data.taille,
      couleurs: req.body.data.couleur,
      materiaux: req.body.data.materiaux,
      prix_depart: req.body.data.prix_depart
    }
    if(req.body.seuil) article.seuil_reserve = req.body.seuil;
    articleRepository.createArticle(article).then((article) => {
      if(!article){
        return res.status(404).send({message: "Article non créé"});
      }
      article.setVendeur(id);
      return res.send(article);
    }
  ).catch((err) => {
    return res.status(500).send({message: err.message});
  }
)
};




}
module.exports = new TodoController();