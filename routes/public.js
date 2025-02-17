import express, { json } from 'express'

const router = express.Router()

// Rota de Cadastro

router.post('/cadastro', (req , res) => {
    const user = req.body

    res.status(201).json(user)
})


export default router


// mondodp cluster
// name - Lucas
// Senha - Lvb060306
// mongodb+srv://Lucas:<db_password>@cluster0.ozdpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0