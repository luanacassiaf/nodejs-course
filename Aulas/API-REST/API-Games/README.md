# API-Games

Esta API é utilizada para x e y.

## Endpoints

### GET /games
Endpoint responsável por retornar a listagem de todos os jogos registrados.

#### Parâmetros
Nenhum.

#### Respostas
##### 200 OK
Caso essa  resposta aconteça, você irá receber a listagem de todos os jogos.  

Exemplo de resposta:
```
[
    {
        "id": 1,
        "title": "The Legend Of Zelda",
        "year": 1986,
        "price": 29
    },
    {
        "id": 2,
        "title": "Mario Bros",
        "year": 1983,
        "price": 28
    },
    {
        "id": 3,
        "title": "Sonic the Hedgehog",
        "year": 1991,
        "price": 27
    }
]
```
##### 401 Falha na autenticação
Caso essa resposta aconteça, ocorreu alguma falha durante o processo de autenticação da requisição.  
Motivos: token inválido, token expirado.

Exemplo de resposta:
```
{
    "err": "Token inválido."
}
```

### POST /auth
Endpoint responsável por fazer o processo de login.

#### Parâmetros
`name`: Nome do usuário registrado no sistema.  
`password`: Senha do usuário registrado no sistema.

Exemplo:
```
{
    "name": "admin",
    "password": "123"
}
```

#### Respostas
##### 200 OK
Caso essa  resposta aconteça, você irá receber o token de acesso.  

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjU5Mzg1MDM4LCJleHAiOjE2NTk1NTc4Mzh9.AOGGw95S0gR4N46fgHmDWZ2sN8gkC3CBci5HAU_PL94"
}
```
##### 401 Falha na autenticação
Caso essa resposta aconteça, ocorreu alguma falha durante o processo de autenticação da requisição.  
Motivos: nome de usuário ou senha incorretos.

Exemplo de resposta:
```
{
    "err": "Credenciais inválidas."
}
```
