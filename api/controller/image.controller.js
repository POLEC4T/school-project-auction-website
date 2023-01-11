const logger = require('../logger/api.logger');
const imageRepository = require('../repository/image.repository');

class TodoController{

    getArticleImagesByArticleId = async (id) => {
      logger.info('imageController: getArticleImagesByArticleId')
      return await imageRepository.getArticleImagesByArticleId(id);
  }

}
module.exports = new TodoController();