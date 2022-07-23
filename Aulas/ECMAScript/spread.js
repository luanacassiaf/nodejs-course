var nome = "Luana"
var idade = 22
var empresa = {
    razao_social: "Capsule Corp.",
    cidade: "Capital do Oeste"
}

var user = {
    nome,
    idade,
    ...empresa
}

// spread copia e cola os campos de empresa em user

console.log(user)