const db = require('../config/db.config').connect();
class RoleRepository{
    constructor(){
        this.db = db;
    }
    async getRoles(){
        try{
        const roles = await this.db.roles.findAll();
        return roles;
        }catch(err){
        console.log(err);
        return [];
        }
    }
    async getRoleById(id){
        try{
        const role = await this.db.roles.findOne({
            where: {
            id: id
            }
        });
        return role;
        }catch(err){
        console.log(err);
        return {};
        }
    }
}

module.exports = new RoleRepository();