module.exports = (sequelize, DataTypes, Model) => {

    class Likes extends Model {}
    Likes.init({
        // attributs du modèle
        articleId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },

      }, {
        // autres options du modèle
        sequelize, // instance de connexion
        modelName: 'like' // nom du modèle
      });
      
      return Likes;
}