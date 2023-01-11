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
}
module.exports = new TodoController();