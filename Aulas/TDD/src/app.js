let express = require("express")
var app = express()

app.get("/", (req, res) => {
    res.sendStatus(200)
})

app.get("/pokeball", (req, res) => {
    res.json({"pokemon": "Pikachu"})
})

module.exports = app