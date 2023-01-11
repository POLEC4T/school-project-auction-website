const jwt = require("jsonwebtoken");
const secret = require("../auth/secret");
const db = require("../config/db.config").connect();

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Pas de token fourni"
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "token non valide !"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  db.users.findByPk(req.userId).then(user => {
    user.getRole().then(role => {
        if (role.name === "admin") {
            next();
            return;
          }
      

      res.status(403).send({
        message: "Vous n'avez pas le rôle admin"
      });
      return;
    });
  });
};

isVendeur = (req, res, next) => {
    db.users.findByPk(req.userId).then(user => {
      user.getRole().then(role => {
          if (role.name === "vendeur") {
              next();
              return;
            }
        
  
        res.status(403).send({
          message: "Vous n'avez pas le rôle vendeur"
        });
        return;
      });
    });
  };

  isAcheteur = (req, res, next) => {
    db.users.findByPk(req.userId).then(user => {
      user.getRole().then(role => {
          if (role.name === "acheteur") {
              next();
              return;
            }
        
  
        res.status(403).send({
          message: "Vous n'avez pas le rôle acheteur"
        });
        return;
      });
    });
  };

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isVendeur: isVendeur,
  isAcheteur: isAcheteur
};
module.exports = authJwt;
