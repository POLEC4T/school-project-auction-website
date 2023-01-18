const db = require('../config/db.config').connect();
const roleModel = db.roles;
const Op = db.Sequelize.Op;

class UserRepository {


    constructor() {
        this.db = db;
    }

    async getUsers() {
        try {
            const users = await this.db.users.findAll({
              });              
            return users;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    async createUser(user) {
        try{
            const newUser = await this.db.users.create(user);
            return newUser;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    async getUserByLogin(login) {

        try {
            const user = await this.db.users.findOne({
                where: {
                    login: login
                }, 
            });
            return user;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    async getUserWithPasswordByLogin(login) {

        try {
            const user = await this.db.users.scope('withPassword').findOne({
                where: {
                    login: login
                }, 
            });
            return user;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    async getUserById(id) {

        try {
            const user = await this.db.users.findOne({
                where: {
                    id: id
                },
            });
            return user;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    async deleteUser(id) {
            
        try {
            const user = await this.db.users.destroy({
                where: {
                    id: id
                },
            });
            return user;
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    async deleteUserByLogin(login) {  
        try {
            const user = await this.db.users.destroy({
                where: {
                    login: login
                },
            });
            return user;
        } catch (err) {
            console.log(err);
            return {};
        }  
}

        async updateSolde(id, solde) {
            try {
                await this.db.users.update({ solde: solde }, { where: { id: id } });
                return { message: "Solde updated successfully!" };
            } catch (err) {
                console.log(err);
                throw err;
            }
        }

        async getArticlesWonbyUserId(userId) {
            try {
            const articles = await this.db.articles.findAll({
                where: {
                gagnant: userId
                }
            });
            return articles;
            } catch (err) {
            console.log(err);
            return [];
            }
        }

        async getArticlesSoldbyUserId(userId) {
            try {
                const articles = await this.db.articles.findAll({
                    where: {
                        vendeurId: userId,
                        [Op.or]: [
                            { statut: "Finie" },
                            { statut: "Livrée" },
                            { statut: "En attente de livraison" }
                        ]
                    }
                });
                return articles;
            } catch (err) {
                console.log(err);
                return [];
            }
        }
        
  

    

}

module.exports = new UserRepository();