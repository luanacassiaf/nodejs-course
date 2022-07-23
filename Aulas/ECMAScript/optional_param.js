// se b não for informado, será definido como 50
function soma(a, b = 50) {
    console.log(a + b)
}

// não podem haver parâmetros obrigatórios 
// entre ou após os parâmetros opcionais

function sub(a, b, inverter = false) {
    if(inverter) {
        console.log(b - a)
    }
    else {
        console.log(a - b)
    }
}