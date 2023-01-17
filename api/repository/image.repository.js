const db = require('../config/db.config').connect();
const logger = require('../logger/api.logger');


class ImageRepository {


    constructor() {
        this.db = db;
    }

    async getArticleImagesByArticleId(articleId) {

        try {
            const images = await this.db.images.findAll({
                where: {
                    articleId: articleId
                },
            });
            return images;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    async uploadImage(url, articleId) {
        try {
            console.log("uploadImage repository, url: " + url + " articleId: " + articleId);
            const newImage = await this.db.images.create({url}).then((image) => {
                image.setArticle(articleId);
            });
            return newImage;
        } catch (err) {
            console.log(err);
            return {};
        }
    }
}

module.exports = new ImageRepository();