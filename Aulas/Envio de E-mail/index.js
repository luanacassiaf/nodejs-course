const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS requires secureConnection to be false
    auth: {
        user: "user@gmail.com",
        pass: ""
    }
})

transporter.sendMail({
    from: "User <user@gmail.com>",
    to: "whatever@email.com",
    subject: "Hello, it's me",
    text: "Hello from the other side!",
    html: "<h1>I must've called a thousand times</h1>"
}).then(message => {
    console.log(message)
}).catch(err => {
    console.log(err)
})