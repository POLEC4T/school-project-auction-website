module.exports = (sequelize, DataTypes, Model) => {

    class Reports extends Model {}

    Reports.init({
        // attributs du modèle
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        motif: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmpty: { msg: "le motif ne doit pas être vide"},
            notNull: { msg: "le motif est obligatoire"},
          }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_DATE')
        }
      }, {
        // autres options du modèle
        sequelize, // instance de connexion
        modelName: 'report' // nom du modèle
      });
      
      return Reports;
}