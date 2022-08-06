var database = require('./database')

var dados = [
    {
        nome: "The Legend Of Zelda",
        preco: 29.90
    },
    {
        nome: "Mario Bros",
        preco: 28.99
    },
    {
        nome: "Sonic the Hedgehog",
        preco: 27.40
    },
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
        var res = await database.delete().where({id: 8}).table("games")
        console.log(res)
    }catch(err) {
        console.log(err)
    }
}

async function sql_update() {
    var res = await database.where({nome: "Pokémon Red"}).update({preco: 49.99}).table("games")
    console.log(res)
}

async function sql_orderBy() {
    var data = await database.select().table("games").orderBy("preco", "desc")
    console.log(data)
}

// 1:1 e 1:N
async function associated_insert() {
    var res = await database.insert({nome: "Nintendo", game_id: 18}).table("estudios")
    console.log(res)
}

// 1:N
async function sql_innerJoin() {
    var data = await database.select(["games.*", "estudios.nome as estudio_nome"]).table("games")
        .innerJoin("estudios", "estudios.game_id", "games.id").where("estudios.nome", "Nintendo")
    var estudio = {
        nome: "Nintendo",
        games: []
    }
    data.forEach(game => {
        estudio.games.push({nome: game.nome})
    })
    console.log(estudio)
}

// N:N
async function sql_innerJoins() {
    var data = await database.select([
            "games.nome as game_nome", 
            "estudios.nome as estudio_nome"
        ]).table("games_estudios")
        .innerJoin("games", "games.id", "games_estudios.game_id")
        .innerJoin("estudios", "estudios.id", "games_estudios.estudio_id")
    console.log(data)
}

async function sql_transaction() {
    try {
        await database.transaction(async trans => {
            await database.insert({nome: "Mojang"}).into("estudios")
            await database.insert({nome: "Capcom"}).into("estudios")
            await database.insert({nome: "Niantic"}).into("estudios")
        })
    } catch(err) {
        console.log(err)
    }
}

sql_transaction()