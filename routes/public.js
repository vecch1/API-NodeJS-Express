import express, { json } from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

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


//  Rota de Login
router.post('/login', async (req,res) => {
    
    try{
        const userInfo = req.body

        //  busca usuario no banco 
        const user = await prisma.user.findUnique({where: {email: userInfo.email},
        })

        // verifica se o usuario existe
        if(!user){
            return res.status(404).json({message:"usuário não encontrado"})
        }


        // compara as senha do banco com a do usuario digitou
        const isMatch = await bcrypt.compare(userInfo.password, user.password)
        
        if(!isMatch){
            return res.status(400).json({message: "Senha inválida"})
        }
    

        // Gerar o token JWT



        res.status(200).json(user)

    } catch(err) {
        res.status(500).json({ message: "Erro no servidor, tente novamente" });
    }

})


export default router


// mongodp cluster
// name - Lucas
// Senha - Lvb060306
// mongodb+srv://Lucas:<db_password>@cluster0.ozdpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0