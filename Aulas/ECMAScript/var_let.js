// var possui os escopos global e local

// o escopo da variável é global for declarado fora de uma função 
// ou local caso declarado dentro de uma função

var nome = "Luana" // Global

function f1() {
    var sobrenome = "Freitas" // Local
    console.log("Olá " + nome + " " + sobrenome)
}

function f2() {
    //console.log("Hello " + nome + " " + sobrenome)
}

f1()
f2()

// let tem os escopos global, local e de bloco
// blocos são definidos por {} 

let a = 10 // Global

{
    let b = 20 // Bloco
    console.log(a + b)
}    
//console.log(a + b)
