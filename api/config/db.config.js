const { Sequelize, Model, DataTypes } = require("sequelize");
const logger = require('../logger/api.logger');
const bcrypt = require('bcrypt')
require('dotenv').config({ path: '../.env' })


const connect = () => {

    const hostName = process.env.DB_HOST;
    const userName = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_NAME;
    const dialect = process.env.DB_DIALECT;

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        dialect: dialect,
        port: process.env.DB_PORT,
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.users = require("../model/user.model")(sequelize, DataTypes, Model);
    db.roles = require("../model/role.model")(sequelize,DataTypes,Model);
    db.reports = require("../model/report.model")(sequelize,DataTypes,Model);
    db.articles = require("../model/article.model")(sequelize, DataTypes, Model);
    db.images = require("../model/image.model")(sequelize, DataTypes, Model);
    db.encheres = require("../model/enchere.model")(sequelize, DataTypes, Model);

    db.ROLES = ['vendeur','acheteur','admin']

    //associations

    //role-user : one to many : un user a un role mais un role a plusieurs users
    db.users.belongsTo(db.roles, {
    })
    db.roles.hasMany(db.users);

    //article-user : one to many : un article a 1 createur mais un createur a plusieurs articles
    db.articles.belongsTo(db.users, {
        as: 'vendeur',
    })
    db.users.hasMany(db.articles, {
        foreignKey: 'vendeurId',
    })

    //image-article: one to many : une image appartient à 1 article mais un article a plusieurs images
    db.images.belongsTo(db.articles, {
    })
    db.articles.hasMany(db.images)

    //enchere: 1 enchère appartient à 1 article et à 1 user
    //un article a plusieurs enchères et un user a plusieurs enchères
    db.encheres.belongsTo(db.articles, {
    })
    db.encheres.belongsTo(db.users, {
    })
    db.articles.hasMany(db.encheres)
    db.users.hasMany(db.encheres)

    //un report est fait par 1 user et contre 1 user
    //un user peut avoir fait plusieurs report et recu plusieurs report
    db.reports.belongsTo(db.users, {
        as: 'reporter',
    })
    db.reports.belongsTo(db.users, {
        as: 'reported',
    })
   

    return db;

}

const db = connect()

module.exports = {
    connect
}