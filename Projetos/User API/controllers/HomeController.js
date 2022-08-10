class HomeController {
    async index(req, res) {
        res.send("User API")
    }

    async validate(req, res) {
        res.send("User API")
    }
}

module.exports = new HomeController()