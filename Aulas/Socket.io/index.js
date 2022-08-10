const express = require("express")
const app = express()
var http = require("http").createServer(app)
var io = require("socket.io")(http)

io.on("connection", (socket) => {

    socket.on("disconnect", () => {
        console.log(socket.id + " desconectou.")
    })

    socket.on("welcome", (data) => {
        console.log("Welcome, " + data.name + "!")
    })

    socket.on("phrase", (data) => {
        console.log(data)
        socket.emit("result", data + " (FREITAS, 2022)")
    })
})

app.set("view engine", "ejs")
app.get("/", (req, res) => {
    res.render("index")
})

http.listen(8000, () => {
    console.log("Servidor em execução.")
})