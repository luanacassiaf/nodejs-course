var http = require("http")

http.createServer(function(requisicao, resposta){
    resposta.end("<h1>Welcome!</h1><h4>You are a wonderful person.</h4>")
}).listen(8181)
console.log("Rodando.");