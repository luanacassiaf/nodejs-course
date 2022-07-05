const Sequelize = require("sequelize")
const connection = require("./database")

const Resposta = connection.define("resposta", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

//CREATE TABLE IF NOT EXISTS
Resposta.sync({force: false})

module.exports = Resposta