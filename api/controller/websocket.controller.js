const db = require("../config/db.config").connect();

class TodoController {
  addEnchere = async (montant, userId, articleId) => {
    // d'abord, on crée une transaction:
    const t = await db.sequelize.transaction();

    try {
      //on récupère la dernière enchère
      const lastEnchere = await db.encheres.findOne({
        where: {
          articleId: articleId,
        },
        order: [["createdAt", "DESC"]],
        transaction: t,
      });

      //on vérifie que le montant de l'enchère est supérieur à la dernière enchère
      if (montant <= lastEnchere.montant) {
        throw new Error(
          "Le montant de l'enchère doit être supérieur à la dernière enchère"
        );
      }

      //on vérifie que l'utilisateur a un solde suffisant
      const user = await db.users.findOne({
        where: {
          id: userId,
        },
        transaction: t,
      });

      if (montant > user.solde) {
        throw new Error("Vous n'avez pas assez d'argent sur votre compte");
      }

      //on vérifie que la dernière enchère n'a pas déjà été faite par l'utilisateur
      const lastUser = await lastEnchere.getUser();
        if (lastUser.id == userId) {
            throw new Error("Vous possédez déjà l'enchère la plus haute");
        }

      //on vérifie que l'utilisateur n'a pas le role vendeur
      const role = await user.getRole();
      if (role.name == "vendeur") {
        throw new Error("Vous ne pouvez pas enchérir avec un compte vendeur");
      }


      //si il n'y a pas eu d'erreur, on débite le compte de l'utilisateur
      await user.update(
        {
          solde: user.solde - montant,
        },
        { transaction: t }
      );
      //puis on redonne l'argent de la dernière enchère à l'utilisateur qui l'a faite
      await lastUser.update(
        {
          solde: lastUser.solde + lastEnchere.montant,
        },
        { transaction: t }
      );
      //et on ajoute l'enchère en base de données
      const enchere = await db.encheres.create(
        {
          montant: montant,
        },
        { transaction: t }
      );

      //on ajoute l'association entre l'enchère et l'utilisateur
      await enchere.setUser(userId, { transaction: t });

      //on ajoute l'association entre l'enchère et l'article
      await enchere.setArticle(articleId, { transaction: t });

      // Si l'exécution arrive jusqu'ici, la transaction a été validée
      // et les modifications apportées à la base de données seront définitives.
      await t.commit();
      return montant;
    } catch (error) {
      //Si une erreur est survenue, annule la transaction.
      console.log(error);
      await t.rollback();
      throw error;
    }
  };
}
module.exports = new TodoController();
