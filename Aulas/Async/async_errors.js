// Converter promise hell em código que utilize async await

function pegarId() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5)
        }, 1500)
    })
}

function buscarEmailNoBanco(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('user@domain.com')
        }, 2000)
    })
}

function enviarEmail(corpo, destinatario) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var error = true
            if(!error) {
                resolve('Email enviado.')
            } else {
                reject('Falha ao enviar email.')
            }
        }, 2000)
    })
}

async function main() {
    var id = await pegarId()
    var email = await buscarEmailNoBanco(id)
    try {
        var response = await enviarEmail('Hello World', email)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

main()