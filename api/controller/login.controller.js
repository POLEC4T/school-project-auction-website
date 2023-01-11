const UserRepository = require('../repository/user.repository');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const secret = require("../auth/secret")

class TodoController {
    login = (req,res) => {
        UserRepository.getUserByLogin(req.body.login).then((user) => {
            if (!user) {
                return res.status(404).json({ message: "Cet utilisateur n'existe pas"})
            }

            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if (!isPasswordValid) {
                    return res.status(401).json({ message: "Le mot de passe est incorrect"})
                }

                //JWT
                const token = jwt.sign(
                    { userId: user.id },
                    secret,
                    { expiresIn: '24h' }
                )

                const message = "L'utilisateur a été authentifié avec succès !"
                
            })
        }).catch((err) => {
            res.status(500).json({ message: err.message })
        }
        )
    }
  }
  module.exports = new TodoController();