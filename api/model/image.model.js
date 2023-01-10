module.exports = (sequelize, DataTypes, Model) => {

    class Images extends Model {}
    Images.init({
        // attributs du modèle
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        url: {
          type: DataTypes.STRING,
        }
      }, {
        // autres options du modèle
        sequelize, // instance de connexion
        modelName: 'image' // nom du modèle
      });
      
      return Images;
}