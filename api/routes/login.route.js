const { connect } = require('../config/db.config');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const secret = require("../auth/secret")

module.exports = (app) => {
    app.post('/api/login', (req,res) => {

        const db = connect()
        const user = db.users
        user.findOne({ where: { username: req.body.username}}).then(user => {
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
                return res.json({ message, data: user, token})
            })
        })
        .catch(err => {
            res.status(500).json({ message: "Connexion impossible. Veuillez rééssayer plus tard", data: error})
        })
    })
}