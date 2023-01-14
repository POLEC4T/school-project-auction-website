const db = require('../config/db.config').connect();

class AccueilRepository {


    constructor() {
        this.db = db;
    }

    async getArticlesWithLeastTimeLeft() {
        try {

            const articles = await this.db.articles.findAll();
    
            const activeArticles = articles; /*.filter(article => new Date(article.expires) > new Date());*/

            const sortedArticles = activeArticles /*.sort((a, b) => {
                return new Date(a.expires) - new Date(b.expires);
            });Z */

            return sortedArticles.slice(0, 7);

        } catch (err) {
            console.log(err);
            return {};
        }
    }
    
        
}

module.exports = new AccueilRepository();