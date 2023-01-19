const db = require("../config/db.config").connect();
const ROLES = db.ROLES;

checkDuplicateLoginOrEmail = (req, res, next) => {
  // Vérification du login
  db.users.findOne({
    where: {
      login: req.body.login
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Ce login est déjà utilisé"
      });
      return;
    }

    // Vérification de l'email
    db.users.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkRoleExists = (req, res, next) => {
  if (req.body.roles) {
    if (!ROLES.includes(req.body.roles)) {
        res.status(400).send({
          message: "Failed! Role does not exist"
        });
        return;
      }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateLoginOrEmail: checkDuplicateLoginOrEmail,
  checkRoleExists: checkRoleExists
};

module.exports = verifySignUp;
