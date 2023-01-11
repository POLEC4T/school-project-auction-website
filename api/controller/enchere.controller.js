const logger = require('../logger/api.logger');
const enchereRepository = require('../repository/enchere.repository');

class TodoController{
    getDerniereOffre = (req,res) => {
      logger.info('Controller: getDerniereOffre')
      enchereRepository.getDerniereOffre(req.params.articleId)
      .then((enchere) => {
        if(!enchere){
          return res.status(404).send({message: "Pas d'offre sur cet article"});
        }
        return res.status(200).send(enchere);
      })
      .catch((err) => {
        return res.status(500).send({message: err});
      }
      )
    }
}

module.exports = new TodoController();