var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : '127.0.0.1',
        port : 3306,
        user : 'admin',
        password : 'root',
        database : 'knexjs'
    }
});

module.exports = knex