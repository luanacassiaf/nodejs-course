// Composição

class Leitor {
    Ler(caminho) {
        console.log('Lendo conteúdo')
    }
}

class Escritor {
    Escrever(arquivo, conteudo) {
        console.log('Arquivo escrito')
    }
}

class Criador {
    Criar(nome) {
        console.log('Arquivo criado')
    }
}

class Destruidor {
    Deletar(nome) {
        console.log('Arquivo deletado')
    }
}

class ManipuladorDeArquivo {
    constructor(nome) {
        this.arquivo = nome
        this.leitor = new Leitor
        this.escritor = new Escritor
        this.criador = new Criador
        this.destruidor = new Destruidor
    }
}

class GerenciadorDeUsuarios {
    constructor() {
        this.criador = new Criador()
        this.escritor = new Escritor()
    }

    SalvarListaDeUsuarios(lista) {
        this.criador.Criar('usuarios.txt')
        this.escritor.Escrever('usuarios.txt',lista)
    }
}

var manipulador = new ManipuladorDeArquivo('meuarquivo.txt')
manipulador.leitor.Ler()
manipulador.escritor.Escrever()
manipulador.criador.Criar()
manipulador.destruidor.Deletar()

var usuarios = new GerenciadorDeUsuarios()
usuarios.SalvarListaDeUsuarios(['Huguinho', 'Zezinho', 'Luisinho'])