const validroles = ['vendeur','acheteur','admin']
module.exports = (sequelize, DataTypes, Model) => {

    class Roles extends Model {}
    Roles.init({
        // attributs du modèle
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: { msg: "le nom de role ne doit pas être vide"},
            notNull: { msg: "le nom de role est obligatoire"},
            isValidName(name){
              if(!validroles.includes(name)){
                throw new Error("Le nom de rôle doit être 'vendeur', 'acheteur' ou 'admin'")
              }
            }
          }
        }
      }, {
        // autres options du modèle
        sequelize, // instance de connexion
        modelName: 'role' // nom du modèle
      });
      
      return Roles;
}