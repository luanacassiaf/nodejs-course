const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const AppointmentService = require("./services/AppointmentService")

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

mongoose.connect("mongodb://localhost:27017/agendamento")

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/register", (req, res) => {
    res.render("create")
})

app.post("/create", async (req, res) => {
    var status = await AppointmentService.create(
        req.body.name,
        req.body.email,
        req.body.description,
        req.body.cpf,
        req.body.date,
        req.body.time
    )

    if(status) {
        res.redirect("/")
    } else {
        res.send("Ocorreu uma falha.")
    }
})

app.get("/calendar", async (req, res) => {
    var appointments = await AppointmentService.getAll(false)
    res.json(appointments)
})

app.get("/event/:id", async (req, res) => {
    var appointment = await AppointmentService.getById(req.params.id)
    res.render("event", {appo: appointment})
})

app.post("/finish", async (req, res) => {
    var id = req.body.id
    await AppointmentService.finish(id)
    res.redirect("/")
})

app.get("/list", async (req, res) => {
    var appos = await AppointmentService.getAll(true)
    res.render("list", {appos})
})

app.get("/search", async (req, res) => {
    var appos = await AppointmentService.search(req.query.data)
    res.render("list", {appos})
})

// Pooling
setInterval(async () => {
    await AppointmentService.sendNotification()
}, 300000)

app.listen(8000)