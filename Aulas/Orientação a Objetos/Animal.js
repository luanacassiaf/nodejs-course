// Herança

class Animal {
    constructor(nome, idade) {
        this.nome = nome
        this.idade = idade
    }

    ChecarQuantidade() {
        console.log(10)
    }

    Comer() {
        console.log('O animal está comendo')
    }
}

class Cachorro extends Animal {
    constructor(nome, idade, raca, peso) {
        super(nome, idade)
        this.raca = raca
        this.peso = peso
    }

    Latir() {
        console.log('Au au')
    }

    ChecarQuantidade() {
        console.log(4)
    }

    Comer() {
        super.Comer()
        console.log('Cães comem ração')
    }
}

var dog = new Cachorro('Caramelinho', 5, 'c', 30)
dog.ChecarQuantidade()
dog.Latir()
dog.Comer()

var animal = new Animal('Patolino', 20)
animal.ChecarQuantidade()