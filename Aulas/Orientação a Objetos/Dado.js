class Dado {
    constructor(faces) {
        this.faces = faces
    }

    Rolar() {
        console.log(Math.floor(Math.random() * (this.faces) + 1))
    }
}

var d20 = new Dado(20)
d20.Rolar()