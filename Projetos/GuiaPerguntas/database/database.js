const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'admin', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection