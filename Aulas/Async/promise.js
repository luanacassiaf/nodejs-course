function enviarEmail(corpo, destinatario) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var error = false
            //resolve e reject só podem conter um parâmetro
            if(!error) {
                resolve({time: 2, to: destinatario})
            } else {
                reject('Falha ao enviar email.')
            }
        }, 2000)
    })
}

enviarEmail('Hello World', 'user@domain.com').then(({time, to}) => {
    console.log(`
    Email enviado.
    ---------------------
    Time: ${time}
    To: ${to}
    `)
}).catch((error) => {
    console.log(error)
})