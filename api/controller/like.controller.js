const logger = require("../logger/api.logger");
const likeRepository = require("../repository/like.repository");
const jwt = require("jsonwebtoken");
const secret = require("../auth/secret");

class TodoController {

    createLike = (req, res) => {
        logger.info("Controller: CreateLike");
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.decode(token);
        const id = decoded.id;

        const like = {
            userId: id,
            articleId: req.params.articleId
        }
        likeRepository.createLike(like).then((like) => {
            if (!like) {
                return res.status(404).send({ message: "Like non créé" });
            }
            return res.send(like);
        }
        ).catch((err) => {
            return res.status(500).send({ message: err.message });
        }
        )
    };

    removeLike = (req, res) => {
        logger.info("Controller: removeLike");
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.decode(token, secret);
        const id = decoded.id;

        likeRepository.removeLike(id, req.params.articleId).then((like) => {
            if (!like) {
                return res.status(404).send({ message: "Like non supprimé" });
            }
            return res.send(like);
        }
        ).catch((err) => {
            return res.status(500).send({ message: err.message });
        }
        )
    };

    isArticleLikedByUser = (req, res) => {

        let token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.decode(token);
        const uid = decoded.id;

        likeRepository.isArticleLikedByUser(uid, req.params.articleId).then((like) => {
            if (!like) {
                return res.status(200).send({liked: false});
            }
            return res.status(200).send({liked: true});
        }
        ).catch((err) => {
            return res.status(500).send({ message: err.message });
        }
        )
    }

}
module.exports = new TodoController();