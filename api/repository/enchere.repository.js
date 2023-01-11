const db = require('../config/db.config').connect();
const logger = require('../logger/api.logger');


class EnchereRepository {


    constructor() {
        this.db = db;
    }

    async getDerniereOffre(articleId) {

        try {
            const enchere = await this.db.encheres.findOne({
                where: {
                    articleId: articleId
                },
            });
            console.log('enchere:::', enchere);
            return enchere;
        } catch (err) {
            console.log(err);
            return {};
        }
    }
}

module.exports = new EnchereRepository();