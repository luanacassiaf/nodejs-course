var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var express = require("express")
var flash = require("express-flash")
var session = require("express-session")
var validator = require("validator")
var app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}))

app.use(cookieParser("Nt*R*9QDNdEK8kk#TCm6"))

app.use(session({
    secret: 'bYE2ADjug5#j',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

app.use(flash())

app.get("/", (req, res) => {
    var emailError = req.flash("emailError")
    var nomeError = req.flash("nomeError")
    var idadeError = req.flash("idadeError")

    var email = req.flash("email")
    var nome = req.flash("nome")
    var idade = req.flash("idade")

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError
    idadeError = (idadeError == undefined || idadeError.length == 0) ? undefined : idadeError

    email = (email == undefined || email.length == 0) ? "" : email
    nome = (nome == undefined || nome.length == 0) ? "" : nome
    idade = (idade == undefined || idade.length == 0) ? "" : idade

    res.render('index', {
        emailError, nomeError, idadeError, email, nome, idade})
})

app.post("/form", (req, res) => {
    var {email, nome, idade} = req.body

    var emailError
    var nomeError
    var idadeError

    if(email == undefined || email == "") {
        emailError = 'E-mail não pode ser vazio.'
    }
    if(!validator.isEmail(email)) {
        emailError = 'E-mail inválido.'
    }
    if(nome == undefined || nome == "") {
        nomeError = "Nome não pode ser vazio."
    }
    if(idade == undefined || idade < 14) {
        idadeError = "Você não pode ter menos de 14 anos."
    }

    if(emailError != undefined || idadeError != undefined || nomeError != undefined) {
        req.flash("emailError", emailError)
        req.flash("nomeError", nomeError)
        req.flash("idadeError", idadeError)

        req.flash("email", email)
        req.flash("nome", nome)
        req.flash("idade", idade)

        res.redirect("/")
    } else {
        res.send('OK')
    }
})

app.listen(8000, (req, res) => {
    console.log("Servidor em execução.")
})