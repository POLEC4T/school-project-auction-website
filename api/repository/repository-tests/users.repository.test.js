const assert = require("assert").strict;
const { markAsUntransferable } = require("worker_threads");
const UserRepository = require("../user.repository");

describe("Tests UserRepository", () => {

   

  describe("Tests createUser", () => {
    it("devrait créer un utilisateur", async () => {
      // création d'un utilisateur avec des propriétés spécifiques

      if (UserRepository.getUserByLogin("testuser") != null) {
        UserRepository.deleteUserByLogin("testuser");
      }

      const user = {
        login: "testuser",
        nom: "testnom",
        prenom: "testprenom",
        pdp: "testpdp",
        password: "testpassword",
        email: "test@email.com",
        nb_strikes: 0,
        roleId: 3,
      };

      // utilisation de la méthode createUser pour créer l'utilisateur
      const createdUser = await UserRepository.createUser(user);

      // vérifications des propriétés de l'utilisateur créé
      assert.strictEqual(createdUser.login, user.login);
      assert.strictEqual(createdUser.nom, user.nom);
      assert.strictEqual(createdUser.prenom, user.prenom);
      assert.strictEqual(createdUser.pdp, user.pdp);
      assert.strictEqual(createdUser.password, user.password);
      assert.strictEqual(createdUser.email, user.email);
      assert.strictEqual(createdUser.nb_strikes, user.nb_strikes);
      assert.strictEqual(createdUser.roleId, user.roleId);
    });

  });

  describe("Tests getUsers", () => {
    it("devrait renvoyer un tableau d'utilisateurs", async () => {
      const users = await UserRepository.getUsers();
      assert.ok(
        Array.isArray(users),
        "La valeur renvoyée n'est pas un tableau"
      );
    });
  });
  

  describe("Tests getUserByLogin", () => {
    it("devrait renvoyer un objet avec un utilisateur correspondant au login fourni", async () => {
      const user = await UserRepository.getUserByLogin("nathan");

      assert.ok(
        typeof user === "object",
        "La valeur renvoyée n'est pas un objet"
      );
      if (user) {
        assert.strictEqual(
          user.login,
          "nathan",
          "L'utilisateur ne correspond pas au login fourni"
        );
      }
    });
  });

  describe("Tests getUserById", () => {
    it("devrait renvoyer un objet avec un utilisateur correspondant à l'id fourni et son mot de passe n'est pas nul", async () => {
      const user = await UserRepository.getUserById(1);

      assert.ok(
        typeof user === "object",
        "La valeur renvoyée n'est pas un objet"
      );
      assert.strictEqual(
        user.id,
        1,
        "L'utilisateur ne correspond pas à l'id fourni"
      );
    });
  });

  describe("Tests getUserWithPasswordByLogin", () => {
    it("devrait renvoyer un objet avec un utilisateur correspondant au login fourni", async () => {
      const user = await UserRepository.getUserWithPasswordByLogin("nathan");

      // // parcours de l'ensemble des données de l'utilisateur
      // for (const key in user.dataValues) {
      //     // affiche la clé et la valeur de l'objet
      //     console.log(' --- ' + key + ' : ' + user[key]);
      // }

      assert.ok(
        typeof user === "object",
        "La valeur renvoyée n'est pas un objet"
      );
      assert.strictEqual(
        user.password,
        "azerty",
        "Le mot de passe est nul : user.password = " + user.login
      );
    });
  });

  describe("Tests deleteUserByLogin", () => {
    it("devrait supprimer un utilisateur", async () => {
      // création d'un utilisateur avec des propriétés spécifiques

      if (UserRepository.getUserByLogin("testuser") != null) {
        UserRepository.deleteUserByLogin("testuser");
      }

      const user = {
        login: "testuser",
        nom: "testnom",
        prenom: "testprenom",
        pdp: "testpdp",
        password: "testpassword",
        email: "test@email.com",
        nb_strikes: 0,
        roleId: 3,
      };

      // utilisation de la méthode createUser pour créer l'utilisateur
      await UserRepository.createUser(user);

      // utilisation de la méthode deleteUserByLogin pour supprimer l'utilisateur
      await UserRepository.deleteUserByLogin("testuser");

      // vérfification de la suppression de l'utilisateur
      
      assert.strictEqual(await UserRepository.getUserByLogin("testuser"),null,"L'utilisateur n'a pas été supprimé");
    });
  });

  if (UserRepository.getUserByLogin("testuser") != null) {
    UserRepository.deleteUserByLogin("testuser");
  }
});
