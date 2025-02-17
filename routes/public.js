import express, { json } from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const router = express.Router()


// Rota de Cadastro

router.post('/cadastro',  async (req , res) => {
    
    try{
    const user = req.body
    
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user.password, salt) 

    const userDB = await prisma.user.create({
        data: {
            email : user.email,
            name : user.name,
            password: hashPassword,
        },
    })

    res.status(201).json(userDB)
    }
    catch(err){
        console.error("Erro detalhado:", err); // Log do erro completo
        res.status(500).json({ message: "Erro no servidor, tente novamente" });
         
    }
})


export default router


// mongodp cluster
// name - Lucas
// Senha - Lvb060306
// mongodb+srv://Lucas:<db_password>@cluster0.ozdpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0