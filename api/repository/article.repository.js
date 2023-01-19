const db = require('../config/db.config').connect()

class ArticleRepository {
    constructor() {
        this.db = db
    }

    async getArticle(id) {
        try {
            const article = await this.db.articles.findOne({
                where: {
                    id : id,
                },
            })
            //on vérifie si la date + 7 jours est dépassée
            if (article.createdAt < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
                article.statut = 'Finie'
                await article.save()
            }
            return article
        } catch (err) {
            console.log(err)
            return {}
        }
    }
    getArticleByTitle(title) {
        try {
            const article = this.db.articles.findOne({
                where: {
                    titre: title
                },
            })
            //on vérifie si la date + 7 jours est dépassée
            if (article.createdAt < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
                article.statut = 'Finie'
                article.save()
            }
            return article
        } catch (err) {
            console.log(err)
            return {}
        }
    
    }


    async getNbLikeArticle(id) {

        try {
            const nbLike = await this.db.likes.count({
                where: {
                    articleId: id,
                },
            })
            // console.log('nbLike:::', nbLike)
            return nbLike
        } catch (err) {
            console.log(err)
            return {}
        }
    }

    async createArticle(article) {
        try {
            //console.log('article:::', article);
            const newArticle = await this.db.articles.create(article)
            return newArticle
        } catch (err) {
            console.log(err)
            return {}
        }
    }

    async getLikedArticles(userId) {
        try {
            const likedArticles = await this.db.articles.findAll({
                include: [
                    {
                        model: this.db.likes,
                        where: { userId: userId },
                    },
                ],
            })
            return likedArticles
        } catch (error) {
            throw new Error(
                `Error fetching liked articles for user with ID ${userId}: ${error.message}`
            )
        }
    }   
    
    async updateStatutArticle(id, statut) {
        try {
            const article = await this.db.articles.findOne({
                where: {
                    id: id
                },
            });
            article.statut = statut;
            const updatedArticle = await article.save();
            return updatedArticle;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    async updateDateLivraisonArticle(id, dateLivraison) {
        try {
            const article = await this.db.articles.findOne({
                where: {
                    id: id
                },
            });
            article.dateLivraison = dateLivraison;
            const updatedArticle = await article.save();
            return updatedArticle;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    deleteArticle(id) {
        
        try {
            this.db.articles.destroy({
                where: {
                    id: id
                },
            });
        } catch (err) {
            console.log(err);
            return {};
        }
        
    }

    deleteArticleByTitle(titre) {
        try {
            this.db.articles.destroy({
                where: {
                    titre: titre
                },
            });
        } catch (err) {
            console.log(err);
            return {};
        }
        
    }
}

module.exports = new ArticleRepository()
