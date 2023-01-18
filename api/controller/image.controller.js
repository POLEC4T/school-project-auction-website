const logger = require('../logger/api.logger');
const imageRepository = require('../repository/image.repository');
const multer = require('multer');

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

  uploadImage = (req,res) => {
    logger.info('imageController: uploadImage')
    imageRepository.uploadImage('/images/' + req.file.filename, req.body.articleId).then((image) => {
      return res.status(200).send(image);
    }
    ).catch((err) => {
      return res.status(500).send({message: err.message});
    })
    res.send({message: req.file.filename});
  }


}
module.exports = new TodoController();