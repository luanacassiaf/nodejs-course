const fs = require('fs')

function modificarPokemon(nome, tipo, treinador) {
    fs.readFile('./pokemon.json', {encoding: 'utf-8'}, (err, data) => {
        if(err) {
            console.log('Erro na leitura do arquivo.')
        } else {
            // Text for JSON
            var content = JSON.parse(data) 
    
            content.nome = nome
            content.tipo = tipo
            content.treinador = treinador
    
             // JSON for text
            fs.writeFile('./pokemon.json', JSON.stringify(content), (err) => {
                if(err) {
                    console.log('Erro ao escrever no arquivo.')
                }
            })
            console.log(content)
        }
    })
}

modificarPokemon('Charmander', 'Fogo', 'Ash Ketchum')
