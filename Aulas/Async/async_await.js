function pegarPokemons() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {name: "Pikachu", type: "Eletric"},
                {name: "Charmander", type: "Fire"},
                {name: "Squirtle", type: "Water"}
            ])
        }, 3000)
    })
}

// pegarPokemons().then((pokemons) => {
//     console.log(pokemons)
// })

// await é bloqueante, não recomendável utilizar em ações longas
async function main() {
    var pokemons = await pegarPokemons()
    console.log(pokemons)
}

main()