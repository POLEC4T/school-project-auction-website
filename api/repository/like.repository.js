const db = require('../config/db.config').connect();

class likeRepository {

    constructor() {
        this.db = db;
    }

    async createLike(like) {
        try {
            const newLike = await this.db.likes.create(like);
            return newLike;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    async removeLike(userId, articleId) {
        try {
            const removedLike = await this.db.likes.destroy({
                where: {
                    userId: userId,
                    articleId: articleId
                }
            });
            return removedLike;
        } catch (err) {
            console.log(err);
            return {};

        }
    }

    async isArticleLikedByUser(uid, articleId) {
        try {
            const like = await this.db.likes.findOne({
                where: {
                    userId: uid,
                    articleId: articleId
                }
            });
            console.log(like);
            return like;
        } catch (err) {
            console.log(err);
            return {};
        }
    }
}

module.exports = new likeRepository();