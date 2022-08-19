const express = require("express")
const MercadoPago = require("mercadopago")
const app = express()

MercadoPago.configure({
    sandbox: true,
    access_token: ""
})

app.get("/", (req, res) => {
    res.sendStatus(200)
})

app.get("/pagar", async (req, res) => {

    id = "" + Date.now()

    var dados = {
        items: [
            item = {
                id,
                title: "Pokeball",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(49.90)
            }
        ],
        payer: {
            email: "user@email.com"
        },
        external_reference: id
    }

    try {
        var pagamento = await MercadoPago.preferences.create(dados)
        return res.redirect(pagamento.body.init_point)
    } catch(err) {
        return res.send(err.message)
    }
})

app.post("/notificar", (req, res) => {
    var id = req.query.id

    setTimeout(() => {
        var filtro = {
            "order.id": id
        }
        MercadoPago.payment.search({
            qs: filtro
        }).then(data => {
            var pagamento = data.body.results[0]
            if(pagamento != undefined) {
                console.log(pagamento.external_reference, pagamento.status)
                if(pagamento.status == "approved") {
                    console.log(`O pagamento ${pagamento.external_reference} foi efetuado.`)
                }
            
            } else {
                console.log("Pagamento não existe.")
            }
        }).catch(err => {
            console.log(err)
        })
    }, 20000)

    res.sendStatus(200)
})

app.listen(process.env.PORT, (req, res) => {
    console.log("Servidor em execução.")
})