var database = require('./database')

var dados = [
    {
        nome: "Pacman",
        preco: 29.90
    },
    {
        nome: "Tetris",
        preco: 28.59
    }
]

function sql_insert() {
    var query = database.insert(dados).into("games")
    console.log(query.toQuery())
}

async function sql_select() {
    var data = await database.select("id", "nome").table("games")
    console.log(data)
}

function nested_queries() {
    database.insert({nome: "Pokémon Red", preco: 19.90}).into("games").then(data => {
        database.select("id", "nome").table("games").then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
}

async function sql_where() {
    // Obter query
    var query = database.select("id")
        .where({nome: "Pacman"})
        .whereRaw("preco < 30.00")
        .orWhere({id: 10})
        .table("games")
    console.log(query.toQuery())

    // Obter dados
    var data = await database.select("id")
        .where({nome: "Pacman"})
        .whereRaw("preco < 30.00")
        .orWhere({id: 10})
        .table("games")
    console.log(data)
}

async function sql_raw() {
    var data = await database.raw("SELECT * FROM games")
    console.log(data)
}

async function sql_delete() {
    try {
        var data = await database.delete().where({id: 8}).table("games")
        console.log(data) // Quantidade de registros deletados
    }catch(err) {
        console.log(err)
    }
}

async function sql_update() {
    var data = await database.where({nome: "Pokémon Red"}).update({preco: 49.99}).table("games")
    console.log(data) // Quantidade de registros atualizados
}

async function sql_orderBy() {
    var data = await database.select().table("games").orderBy("preco", "desc")
    console.log(data)
}

sql_orderBy()