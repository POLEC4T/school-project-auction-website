const logger = require("../logger/api.logger");
const accueilRepository = require("../repository/accueil.repository");

class TodoController {

  getArticlesWithLeastTimeLeft = (req, res) => {
    logger.info("AccueilController: getArticlesWithLeastTimeLeft");
    accueilRepository.getArticlesWithLeastTimeLeft.then((sortedArticles) => {
        if (!sortedArticles) {
            return res.status(404).send({ message: "Aucun article trouvé" });
        }
        
        return res.status(200).send(sortedArticles);
    });
};



}
module.exports = new TodoController();