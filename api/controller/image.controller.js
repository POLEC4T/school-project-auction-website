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

    upload(req, res, (err) => {
      console.log("Request ---", req.body);
      console.log("Request file ---", req.file);
      imageRepository.uploadImage(req.file.path,req.body.articleId).then((image) => {
        if(!image){
          return res.status(404).send({message: "Erreur lors de l'upload de l'image"});
        }
        return res.status(200).send(image);
      })
      if(!err)
         return res.send(200).end();
    }
    )
  }


}
module.exports = new TodoController();