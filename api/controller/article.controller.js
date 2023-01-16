const logger = require("../logger/api.logger");
const articleRepository = require("../repository/article.repository");

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
    logger.info("ArticleController: createArticle");
    const article = {
      titre: req.body.titre,
      description: req.body.description,
      categorie: req.body.categorie,
      taille: req.body.taille,
      couleurs: req.body.couleur,
      materiaux: req.body.materiaux,
      prix_depart: req.body.prix_depart
    }
    if(req.body.seuil) article.seuil_reserve = req.body.seuil;
    articleRepository.createArticle(article).then((article) => {
      if(!article){
        return res.status(404).send({message: "Article non créé"});
      }
      return res.send(article);
    }
  ).catch((err) => {
    return res.status(500).send({message: err.message});
  }
)
};




}
module.exports = new TodoController();