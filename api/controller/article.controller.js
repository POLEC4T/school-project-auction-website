const logger = require('../logger/api.logger');
const articleRepository = require('../repository/article.repository');

class TodoController{

  getArticle = async (id) => {
      logger.info('ArticleController: getArticle')
      return await articleRepository.getArticle(id);
  }

}
module.exports = new TodoController();