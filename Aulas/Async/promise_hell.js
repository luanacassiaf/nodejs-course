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
            var error = false
            if(!error) {
                resolve({time: 2, to: destinatario})
            } else {
                reject('Falha ao enviar email.')
            }
        }, 2000)
    })
}

pegarId().then((id) => {
    buscarEmailNoBanco(id).then((email) => {
        enviarEmail('Hello World', email). then(() => {
            console.log('Email enviado para ID ' + id)
        }).catch(error => {
            console.log(error)
        })
    })
})