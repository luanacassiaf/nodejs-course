const express = require("express")
const app = express()

app.get("/", function(req, res){
    res.send("<h1>Welcome.</h1>")
})

//PARAMETRO OPCIONAL
app.get("/blog/:artigo?", function(req, res){
    var artigo = req.params.artigo
    if (artigo)
        res.send("<h2> Artigo " + artigo + ".</h2>")
    else
        res.send("Blog.")
})

//PARAMENTRO OBRIGATORIO
app.get("/ola/:nome/:empresa", function(req, res){
    //REQ => DADOS ENVIADOS PELO USUARIO
    //RES => RESPOSTA A SER ENVIADA PARA O USUARIO
    var nome = req.params.nome
    var empresa = req.params.empresa
    res.send("<h1>Olá " + nome + " da empresa " + empresa + "!</h1>")
})

//QUERY PARAMS
//ACESSO: http://localhost:4000/canal/youtube?canal=value
app.get("/canal/youtube", function(req, res){
    var canal = req.query["canal"] 
    if(canal)
        res.send(canal)
    else
        res.send("Nenhum canal fornecido.")
})


app.listen(4000, function(erro){
    if(erro)
        console.log("Ocorreu um erro!")
    else
        console.log("Servidor iniciado com sucesso!")
})