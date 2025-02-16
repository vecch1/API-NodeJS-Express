import express from 'express'

const app = express()


/*3 rotas
 
Rotas Públicas
    cadastra e  login

Rotas Privadas
    listar usuário (so entra com token)

*/

app.listen(8080, () => console.log("Servidor rodando 👌"))