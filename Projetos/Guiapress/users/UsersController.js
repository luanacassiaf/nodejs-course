const express = require("express")
const router = express.Router()
const User = require("./User")
const bcrypt = require("bcryptjs")

// Exibir todos
router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users: users})
    })
})

// Página de cadastro
router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create")
})

// Cadastro
router.post("/users/create", (req, res) => {
    var username = req.body.username
    var password = req.body.password

    //res.json({username, password})

    User.findOne({where: {username: username}}).then(user => {
        // Se nulo significa que username não está em uso
        if(user == undefined) {
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)

            User.create({
                username: username,
                password: hash
            }).then(() => {
                res.redirect("/")
            }).catch(() => {
                res.redirect("/")
    })
        } else {
            res.redirect("/admin/users/create")
        }
    })
})

module.exports = router
