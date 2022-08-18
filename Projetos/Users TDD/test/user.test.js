let app = require("../src/app")
let supertest = require("supertest")
let request = supertest(app)

let mainUser = {name: "User", email: "admin@email.com", password: "1234"}

beforeAll(() => {
    return request.post("/user").send(mainUser)
    .then(res => {})
    .catch(err => {console.log(err)})
})

afterAll(() => {
    return request.delete("/user/"+mainUser.email)
    .then(res => {})
    .catch(err => {console.log(err)})
})

describe("Cadastro de usuário", () => {
    test("Deve cadastrar um usuário com sucesso", () => {
        let email = Date.now() + "@email.com"
        let user = {name: "User", email, password: "1234"}
    
        return request.post("/user").send(user).then(res => {
            expect(res.statusCode).toEqual(200)
            expect(res.body.email).toEqual(email)
        }).catch(err => {
            throw new Error(err)
        })
    })

    test("Deve impedir que um usuário se cadastre com dados vazios", () => {
        let user = {name: "", email: "", password: ""}
    
        return request.post("/user").send(user).then(res => {
            expect(res.statusCode).toEqual(400)
        }).catch(err => {
            throw new Error(err)
        })
    })

    test("Deve impedir que um usuário se cadastre com um e-mail repetido", async () => {
        let email = Date.now() + "@email.com"
        let user = {name: "User", email, password: "1234"}
    
        return request.post("/user").send(user).then(res => {
            expect(res.statusCode).toEqual(200)
            expect(res.body.email).toEqual(email)
            
            return request.post("/user").send(user).then(res => {
                expect(res.statusCode).toEqual(400)
                expect(res.body.error).toEqual("E-mail já cadastrado.")
            }).catch(err => {
                throw new Error(err)
            })
            
        }).catch(err => {
            throw new Error(err)
        })
    })
})

describe("Autenticação", () => {
    test("Deve retornar um token quando logar", () => {
        return request.post("/auth").send({email: mainUser.email, password: mainUser.password}).then(res => {
            expect(res.statusCode).toEqual(200)
            expect(res.body.token).toBeDefined()
        }).catch(err => {
            throw new Error(err)
        })
    })

    test("Deve impedir que um usuário não cadastrado se logue", () => {
        return request.post("/auth").send({email: 'whatever@email.com', password: 'whatever'}).then(res => {
            expect(res.statusCode).toEqual(403)
            expect(res.body.errors.email).toEqual("E-mail não cadastrado.")
        }).catch(err => {
            throw new Error(err)
        })
    })

    test("Deve impedir que um usuário se logue com uma senha errada", () => {
        return request.post("/auth").send({email: mainUser.email, password: 'whatever'}).then(res => {
            expect(res.statusCode).toEqual(403)
            expect(res.body.errors.password).toEqual("Senha inválida.")
        }).catch(err => {
            throw new Error(err)
        })
    })
})