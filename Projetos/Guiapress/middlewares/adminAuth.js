function adminAuth(req, res, next) {
    if(req.session.user != undefined) {
        next() // passar a requisição do middleware para a rota
    } else {
        res.redirect("/login")
    }
}

module.exports = adminAuth