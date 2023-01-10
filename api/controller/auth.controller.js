const db = require("../config/db.config").connect();
const secret = require("../auth/secret");
const User = db.users;
const Role = db.roles;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthController{
//enregistrement
signup = (req, res) => {
  // Enregistrer l'utilisateur en bdd
  bcrypt.hash(req.body.password, 10).then(hash => {
    User.create({
      login: req.body.login,
      email: req.body.email,
      password: hash,
      date_naiss: req.body.date_naiss
      })
      .then(user => {
        if (req.body.role_id) {
          Role.findByPk(req.body.role_id)
          .then(role => {
            user.setRole(role.id).then(() => {
              res.send({ message: "Utilisateur créé avec succès", role: "ROLE_" + role.name.toUpperCase() });
            });
          })
        } else {
          // rôle par défaut : 1
          user.setRole(1).then(() => {
            res.send({ message: "Utilisateur créé avec succès", role: "ROLE_VENDEUR" });
          });
        }
      })
      .catch(err => {
        res.status(500).send({ err });
      });
  })
};

//connexion
signin = (req, res) => {
    //trouver le login dans la bdd si il existe
  User.findOne({
    where: {
      login: req.body.login
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur non trouvé" });
      }

      //comparer le mdp avec bcrypt
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe invalide"
        });
      }

      //création du token
      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 86400 // 24 hours
      });

      user.getRole().then(role => {
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          role: "ROLE_" + role.name.toUpperCase(),
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
}

module.exports = new AuthController()