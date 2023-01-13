const db = require('../config/db.config').connect();

class ArticleRepository {


    constructor() {
        this.db = db;
    }

    async getArticle(id) {

        try {
            const article = await this.db.articles.findOne({
                where: {
                    id: id
                },
            });
            return article;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    async getNbLikeArticle(id) {
            
            try {
                const nbLike = await this.db.likes.count({
                    where: {
                        articleId: id
                    },
                });
                console.log('nbLike:::', nbLike);
                return nbLike;
            } catch (err) {
                console.log(err);
                return {};
            }
        }
}

module.exports = new ArticleRepository();