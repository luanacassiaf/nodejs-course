var ash = {
    nome: "Ash",
    pokemon: "Pikachu",
    idade: 10
}

var misty = {
    nome: "Misty",
    pokemon: "Staryu",
    idade: 10
}

var brock = {
    nome: "Brock",
    pokemon: "Onix",
    idade: 15
}

var trainers = [ash, misty, brock]

var treinador = trainers.find(trainer => trainer.idade > 12)
console.log(treinador)