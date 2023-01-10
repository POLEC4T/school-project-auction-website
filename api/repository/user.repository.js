const db = require('../config/db.config').connect();
const logger = require('../logger/api.logger');


class UserRepository {


    constructor() {
        this.db = db;
    }

    async getUsers() {
        
        try {
            const users = await this.db.users.findAll({
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
              });              
            console.log('users:::', users);
            return users;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async getUser(login) {

        try {
            const user = await this.db.users.findOne({
                where: {
                    login: login
                },
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            });
            console.log('user:::', user);
            return user;
        } catch (err) {
            console.log(err);
            return {};
        }
    }
}

module.exports = new UserRepository();