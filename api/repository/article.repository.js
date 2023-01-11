const db = require('../config/db.config').connect();
const logger = require('../logger/api.logger');


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
            console.log('article:::', article);
            return article;
        } catch (err) {
            console.log("sdofn");
            console.log(err);
            return {};
        }
    }
}
const db = require('../config/db.config').connect();
const logger = require('../logger/api.logger');


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
            console.log('article:::', article);
            return article;
        } catch (err) {
            console.log(err);
            return {};
        }
    }
}

module.exports = new ArticleRepository();