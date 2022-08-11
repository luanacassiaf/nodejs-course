const mongoose = require("mongoose")
const ArticleModel = require("./Article")

mongoose.connect("mongodb://localhost:27017/dbnode")

const Article = mongoose.model("Article", ArticleModel)

const article = new Article({
    title: "A Case Study for MongoDB",
    author: "John Doe",
    body: "MongoDB is a document-oriented NoSQL database used for high volume data storage.",
    resume: {content: 'mongo'}
})


async function create() {
    await article.save()
    console.log("Artigo salvo.")
}

async function listAll() {
    var articles = await Article.find({})
    console.log(articles)
}

async function list() {
    // find: pode retornar vários registros
    // findOne: retorna apenas um registro
    var article = await Article.find({'author': 'John Doe', 'resume.content': 'mongo'})
    console.log(article)
}

async function remove() {
    await Article.findByIdAndDelete('62f5847f9dab594f9c1d65e9')
    console.log("Artigo removido.")
}

async function edit() {
    await Article.findByIdAndUpdate('62f5821781e18ba306345c5d', {'author': 'Ash Ketchum', 'resume.content': 'Pikachu'})
    console.log("Artigo editado.")
}

edit()
listAll()