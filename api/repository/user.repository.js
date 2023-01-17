const db = require('../config/db.config').connect();
const roleModel = db.roles;

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

    

}

module.exports = new UserRepository();