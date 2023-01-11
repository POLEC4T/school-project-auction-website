const logger = require('../logger/api.logger');
const imageRepository = require('../repository/image.repository');

class TodoController{

    getArticleImagesByArticleId = (req,res) => {
      logger.info('imageController: getArticleImagesByArticleId')
      imageRepository.getArticleImagesByArticleId(req.params.id).then((images) => {
        if(!images){
          return res.status(404).send({message: "Pas d'image pour cet article"});
        }
        return res.status(200).send(images);
      }
      )
  }

}
module.exports = new TodoController();