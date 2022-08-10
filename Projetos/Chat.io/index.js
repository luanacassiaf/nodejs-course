const express = require("express")
const app = express()
var http = require("http").createServer(app)
var io = require("socket.io")(http)

io.on("connection", (socket) => {

    socket.on("disconnect", () => {
        console.log(socket.id + " desconectou.")
    })

    socket.on("msg", (data) => {
        // Socket cliente envia a todos, exceto cliente
        //socket.broadcast.emit("showmsg", data)
        
        // Servidor envia a todos
        io.emit("showmsg", data) 
    })
})

app.set("view engine", "ejs")
app.get("/", (req, res) => {
    res.render("index")
})

http.listen(8000, () => {
    console.log("Servidor em execução.")
})