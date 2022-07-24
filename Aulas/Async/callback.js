function enviarEmail(corpo, destinatario, callback) {
    setTimeout(() => {
        console.log(`
        Para: ${destinatario}
        --------------------------
        ${corpo}
        --------------------------
        De: Luana Freitas
        `)
        callback('OK', '2s', 'default')
    }, 2000)
}

console.log('Enviando email...')
enviarEmail('Welcome!', 'user@domain.com', (status, time) => {
    console.log('Email enviado.')
    console.log(`
        Status: ${status}
        Time: ${time}
    `)
})