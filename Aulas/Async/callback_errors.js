function enviarEmail(callback) {
    setTimeout(() => {

        // Lógica de envio do email

        var error = false

        if(error) {
            callback(2, 'Falha ao enviar email.')
        } else {
            callback(2)
        }
    }, 2000)
}

console.log('Enviando email...')

enviarEmail((time, error) => {
    if(error == undefined) {
        console.log(`Email enviado em ${time} segundos.`)
    } else {
        console.log(error)
    }
})