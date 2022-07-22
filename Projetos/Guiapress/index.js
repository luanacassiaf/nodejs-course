const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const session = require("express-session")
const connection = require('./database/database')

const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")
const usersController = require("./users/UsersController")

const Article = require('./articles/Article')
const Category = require('./categories/Category')
const User = require('./users/User')

// View Engine
app.set('view engine', 'ejs')

// Session
app.use(session({
    secret: "4T#&Av3VEkR7zg3gYCao", cookie: {maxAge: 7200000}
}))
// Redis para salvamento de sessões em apps de maior escala

// Static
app.use(express.static('public'))

// Body Parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão bem-sucedida.")
    })
    .catch((error) => {
        console.log(error)
    })

app.use("/", categoriesController)
app.use("/", articlesController)
app.use("/", usersController)

app.get("/session", (req, res) => {
    req.session.user = {
        username: "luana",
        id: 8000
    }
    res.send("Sessão gerada.")
})

app.get("/read", (req, res) => {
    res.json({
        user: req.session.user
    })
})

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories})
        })
    })
})

// app.get("/", async(req, res) => {
//     try {
//         const articles = await Article.findAll({
//             order: [
//                 ['id', 'DESC']
//             ],
//             limit: 4
//         })
//         const categories = await Category.findAll()
//         res.render("index", {articles: articles, categories: categories})
//     } catch (error) {
//         res.send(error)
//     }
// })

app.get("/:slug", (req, res) => {
    var slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories})
            })
        }else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
})

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}] // Incluir na busca todos os artigos da categoria
    }).then(category => {
        if(category != undefined) {
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories})
            })
        } else {
            res.redirect("/")
        }
    })
})

app.listen(8080, ()=> {
    console.log("Servidor rodando.")
})
