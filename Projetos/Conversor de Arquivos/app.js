var Reader = require('./Reader')
var Processor = require('./Processor')
var Table = require('./Table')
var HtmlParser = require('./HtmlParser')
var Writer = require('./Writer')
var PDFWriter = require('./PDFWriter')
const PDF = require('html-pdf/lib/pdf')

var leitor = new Reader
var escritor = new Writer

async function main() {
    var dados = await leitor.Read('./pokemon.csv')
    var dadosProcessados = Processor.Process(dados)

    var pokemons = new Table(dadosProcessados)

    var html = await HtmlParser.Parse(pokemons)
    
    escritor.Write(Date.now()+'.html', html)
    PDFWriter.WritePDF(Date.now()+'.pdf', html)
}

main()