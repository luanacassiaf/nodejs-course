let app = require("./src/app")
let supertest = require("supertest")
let request = supertest(app)

test("A aplicação deve responder na porta 8000", async () => {
    let res = await request.get("/")
    expect(res.statusCode).toEqual(200)
})

test("Deve retornar Pikachu", () => {
    return request.get("/pokeball").then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.pokemon).toEqual("Pikachu")
    })
})