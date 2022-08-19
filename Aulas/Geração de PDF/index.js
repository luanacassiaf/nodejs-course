var pdf = require("html-pdf")
var ejs = require("ejs")

var trainer = "Ash Ketchum"

ejs.renderFile("./index.ejs", {trainer}, (err, html) => {
    if(err) {
        console.log(err)
    } else {
        pdf.create(html, {}).toFile("./myfile.pdf", (err, res) => {
            if(err) {
                console.log(err)
            } else {
                console.log(res)
            }
        })
    }
})