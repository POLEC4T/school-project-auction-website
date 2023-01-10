module.exports = (sequelize, DataTypes, Model) => {

    class Encheres extends Model {}
    Encheres.init({
        // attributs du modèle
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        montant: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: {
            notNull: { msg: "le montant de l'enchère est obligatoire"},
          }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_DATE'),
            validate: {
                notNull: { msg: "le montant de l'enchère est obligatoire"},
            }
        }
      }, {
        // autres options du modèle
        sequelize, // instance de connexion
        modelName: 'enchere' // nom du modèle
      });
      
      return Encheres;
}