var User = require("../models/User")
var PasswordToken = require("../models/PasswordToken")
var jwt = require("jsonwebtoken")
var bcrypt = require("bcrypt")

var secret = "7kGfd2Ha2b#$D^wuc%2M"

class UserController {
    async index(req, res) {
        var users = await User.findAll()
        res.json(users)
    }

    async findUser(req, res) {
        var id = req.params.id
        var user = await User.findById(id)
        if(user == undefined) {
            res.status(404)
            res.json({})
        } else {
            res.json(user)
        }
    }

    async create(req, res) {
        var{email, name, password} = req.body

        if(email == undefined) {
            res.status(400)
            res.json({err: "Deve haver um e-mail."})
            return
        }
        if(name == undefined) {
            res.status(400)
            res.json({err: "Deve haver um nome."})
            return
        }
        if(password == undefined) {
            res.status(400)
            res.json({err: "Deve haver uma senha."})
            return
        }

        var emailExists = await User.findEmail(email)
        
        if(emailExists) {
            res.status(406)
            res.json({err: "O e-mail já está cadastrado."})
            return
        }

        await User.new(email, password, name)
        res.sendStatus(200)
    }

    async edit(req, res) {
        var id = req.params.id
        var {name, role, email} = req.body
        var result = await User.update(id, email, name, role)
        if(result != undefined) {
            if(result.status) {
                res.sendStatus(200)
            } else {
                res.status(406)
                res.json(result.err)
            }
        } else {
            res.status(500)
            res.send("Ocorreu um erro no servidor.")
        }
    }

    async remove(req, res) {
        var id = req.params.id

        var result = await User.delete(id)
        if(result.status) {
            res.sendStatus(200)
        } else {
            res.status(406)
            res.send(result.err)
        }
    }

    async recoverPassword(req, res) {
        var email = req.body.email
        var result = await PasswordToken.create(email)
        if(result.status) {
            res.status(200)
            res.send("" + result.token)
        } else {
            res.status(406)
            res.send(result.err)
        }
    }

    async changePassword(req, res) {
        var token = req.body.token
        var password = req.body.password

        var isTokenValid = await PasswordToken.validate(token)
    
        if(isTokenValid.status) {
            var result = await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)
            
            if(result.status) {
                res.status(200)
                res.send("Senha alterada.")
            } else {
                res.status(500)
                res.send(result.err)
            }
        } else {
            res.status(406)
            res.send("Token inválido.")
        }
    }

    async login(req, res) {
        var {email, password} = req.body
        var user = await User.findByEmail(email)
        if(user != undefined) {
            var result = await bcrypt.compare(password, user.password)
            if(result) {
                var token = jwt.sign({email: user.email, role: user.role}, secret)
                res.status(200)
                res.json({token: token})
            }else {
                res.status(406)
                res.send("Senha inválida.")    
            }
        } else {
            res.status(406)
            res.send("O e-mail não existe no banco de dados.")
        }
    }
}

module.exports = new UserController()