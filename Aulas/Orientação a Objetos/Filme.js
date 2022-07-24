class Filme {
    constructor(titulo, ano, genero, duracao) {
        this.titulo = titulo
        this.ano = ano
        this.genero = genero
        this.duracao = duracao
        this.atores = []
    }

    Reproduzir() {
        console.log('Reproduzindo')
    }

    Pausar() {
        console.log('Pausado')
    }

    Avançar() {
        console.log('Avançando')
    }

    Fechar() {
        console.log('Fechado')
    }

    Ficha() {
        console.log('Título: ' + this.titulo)
        console.log('Ano: ' + this.ano)
        console.log('Gênero: ' + this.genero)
        console.log('Duração: ' + this.duracao + ' horas')
    }
}

var vingadores = new Filme('Os Vingadores', 2012, 'Ação', 2)

vingadores.Ficha()