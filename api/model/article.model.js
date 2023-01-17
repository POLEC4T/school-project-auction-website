module.exports = (sequelize, DataTypes, Model) => {

    class Articles extends Model {}

    Articles.init({
        // attributs du modèle
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        titre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Le titre est obligatoire"},
            }
        },
        prix_depart: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: { msg: "le prix de départ doit être renseigné"},
                isPrixValid(value){
                    if(value <= 0){
                        throw new Error("Le prix de départ doit être supérieur à 0")
                    }
                }
            }
        },
        description: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_DATE'),
            validate: {
                notNull: { msg: "La date de création ne doit pas être nulle"}
            }
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_DATE + INTERVAL '2 YEARS'"),
            validate: {
                notNull: { msg: "La date d'expiration ne doit pas être nulle"}
            }
        },
        couleurs: {
            //Les différentes couleurs seront toutes dans la même colonne, séparées par des virgules
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull : { msg: "attribut obligatoire"},
                isCouleursValid(value){
                    if(value.split(',').length == 0){
                        throw new Error("Vous devez spécifier au moins une couleur")
                    }
                }
            }
        },
        materiaux: {
            //Les différents matériauxs seront tous dans la même colonne, séparés par des virgules
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull : { msg: "attribut obligatoire"},
                isMateriauxValid(value){
                    if(value.split(',').length == 0){
                        throw new Error("Vous devez spécifier au moins un matériau")
                    }
                }
            }
        },
        taille: {
            //Les différents tags seront tous dans la même colonne, séparés par des virgules
            type: DataTypes.STRING,
            allowNull: true,
            isIn: {
                args: [['0-4', '5-9', '10-14' , 'xs', 's', 'm', 'l', 'xl', 'xxl']],
            },
        },
        categorie: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'autres',
            isIn: {
                args: [['haut', 'bas', 'autres']],
            },
        },
        seuil_reserve: {
            type: DataTypes.INTEGER,
        },
        
        statut: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "En cours",
            // check if status is valid
            validate: {
                notNull: { msg: "le status de l'enchère est obligatoire"},
                isIn: {
                    args: [['En cours', 'Finie', 'Annulée', 'Livrée', 'En attente de livraison']],
                }
              }
        },

        gagnant: { // id de l'utilisateur gagnant
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            validate: {
                isInt: true,
            }
          },

        dateLivraison: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            validate: {
                isDate: true,
            }
        }
      }, 
      {
        // autres options du modèle
        sequelize, // instance de connexion
        modelName: 'article' // nom du modèle
      });

      async function getNbLikes() {
        const likes = await this.getLikes();
        return likes.length;
      }
      
      return Articles;
}