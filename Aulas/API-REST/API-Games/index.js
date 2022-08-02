const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors")
const jwt = require ("jsonwebtoken")

const JWTSecret = "bf6#oLT5$G!im4%aK4"

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
// converte o corpo da requisição para JSON
app.use(bodyParser.json())

// middleware de autenticação
function auth(req, res, next) {
    const authToken = req.headers['authorization']
    if(authToken != undefined) {
        const bearer = authToken.split(' ')
        var token = bearer[1]
        jwt.verify(token, JWTSecret, (err, data) => {
            if(err) {
                res.status = 401
                res.json({err: "Token inválido."})
            } else {
                req.token = token
                req.loggedUser = {id: data.id, user: data.name}
                next()
            }
        })
    } else {
        res.status(401)
        res.json({err: "Token inválido."})
    }
}

var mockDB = {
    games: [
        {
            id: 1,
            title: "The Legend Of Zelda",
            year: 1986,
            price: 29
        },
        {
            id: 2,
            title: "Mario Bros",
            year: 1983,
            price: 28
        },
        {
            id: 3,
            title: "Sonic the Hedgehog",
            year: 1991,
            price: 27
        },
    ],
    users: [
        {
            id: 1,
            name: "admin",
            password: "123"
        }
    ]
}

app.get("/games", auth, (req, res) => {
    res.statusCode = 200
    res.json(mockDB.games)
})

app.get("/game/:id", auth, (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)
        var game = mockDB.games.find(game => game.id == id)
        if(game != undefined) {
            var hateoas = [
                {
                    href: 'http://localhost:8000/game/'+id,
                    method: 'PUT',
                    rel: 'update_game'
                },
                {
                    href: 'http://localhost:8000/game/'+id,
                    method: 'DELETE',
                    rel: 'delete_game'
                },
                {
                    href: 'http://localhost:8000/game/',
                    method: 'POST',
                    rel: 'create_game'
                },
                {
                    href: 'http://localhost:8000/games/',
                    method: 'GET',
                    rel: 'get_all_games'
                }
            ]
            res.statusCode = 200
            res.json({game: game, _links: hateoas})
        } else {
            res.sendStatus(404)
        }
    }
})

app.post("/game", auth, (req, res) => {
    var {title, price, year} = req.body
    mockDB.games.push({
        id: 4,
        title,
        price,
        year
    })
    res.sendStatus(200)
})

app.delete("/game/:id", auth, (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)
        var index = mockDB.games.findIndex(game => game.id == id)
        if(index == -1) {
            res.sendStatus(404)
        } else {
            mockDB.games.splice(index, 1)
            res.sendStatus(200)
        }
    }
})

app.put("/game/:id", auth, (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)
        var game = mockDB.games.find(game => game.id == id)

        if(game != undefined) {
            var {title, price, year} = req.body
            if(title != undefined) {
                game.title = title
            }
            if(price != undefined) {
                game.price = price
            }
            if(year != undefined) {
                game.year = year
            }
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    }
})

app.post("/auth", (req, res) => {
    var {name, password} = req.body

    if(name != undefined) {
        var user = mockDB.users.find(user => user.name == name)
        if (user != undefined) {

            if(user.password == password) {
                jwt.sign({id: user.id, name: user.name}, JWTSecret, {expiresIn: '48h'}, (err, token) => {
                        if(err) {
                            res.status(500)
                            res.json({err: "Falha interna"})
                        } else {
                            res.status(200)
                            res.json({token: token})
                        }
                    })
            } else {
                res.status(401)
                res.json({err: "Credenciais inválidas."})
            }

        } else {
            res.status(404)
            res.json({err: "Usuário não existe na base de dados."})
        }

    } else {
        res.status(400)
        res.json({err: "Usuário inválido."})
    }
})

app.listen(8000, () => {
    console.log('Em execução.')
})
