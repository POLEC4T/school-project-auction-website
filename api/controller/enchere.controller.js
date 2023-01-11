const logger = require('../logger/api.logger');
const enchereRepository = require('../repository/enchere.repository');

class TodoController{
    getDerniereOffre = async (articleId) => {
      logger.info('Controller: getDerniereOffre')
      return await enchereRepository.getDerniereOffre(articleId);
  }
}

module.exports = new TodoController();