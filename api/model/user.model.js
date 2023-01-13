module.exports = (sequelize, DataTypes, Model) => {

    class Users extends Model {}
    Users.init({
        // attributs du modèle
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        login: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: { msg: "ce nom d'utilisateur est déjà pris"},
          validate: {
            notEmpty: { msg: "le login ne doit pas être vide"},
            notNull: { msg: "le login est obligatoire"}
          }
        },
        pdp: {
          type: DataTypes.STRING
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: { msg: "le mot de passe ne doit pas être vide"},
            notNull: { msg: "le mot de passe est obligatoire"}
          }
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: { msg: "cet email a déjà un compte associé est déjà pris"},
          validate: {
            notEmpty: { msg: "le mail ne doit pas être vide"},
            notNull: { msg: "le mail est obligatoire"},
            isMailValid(value) {
              let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
              return regex.test(value)
            }
          }
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize.literal('CURRENT_DATE'),
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false
        },
        expiration_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize.literal('CURRENT_DATE + interval \'2 years\'')
        },
        nb_strikes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        //éléments de personnalisation
        banniere: {
          type: DataTypes.STRING
        },
        couleur: {
          type: DataTypes.STRING,
          defaultValue: 'black'
        },
        num_siret: {
          type: DataTypes.INTEGER,
          allowNull: true, //car si un user n'est pas vendeur il peut ne pas avoir de numéro de SIRET
          validate: {
            function(value){
              let regex = new RegExp("\d{14")
              return regex.test(value)
            }
          }
        },
        date_naiss: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            notNull: { msg: "La date de naissance ne doit pas être vide"}
          }
        }
      }, {
        // autres options du modèle
        defaultScope: {
          attributes: { exclude: ['password'] } //exclure le password par défaut
        },
        sequelize, // instance de connexion
        modelName: 'user' // nom du modèle
      });
      
      return Users;
}