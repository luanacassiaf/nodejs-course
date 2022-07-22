CREATE TABLE guiaperguntas.pergunta(
	id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE guiaperguntas.resposta(
	id INT NOT NULL AUTO_INCREMENT,
    corpo TEXT NOT NULL,
    perguntaId INT NOT NULL REFERENCES guiaperguntas.pergunta(id),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id)
);