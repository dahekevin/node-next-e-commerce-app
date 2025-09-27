import { PrismaClient } from '../../generated/prisma/client.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const createUser = async (req, res) => {
    try {
        const { name, email, password, phone, role, cpf } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já cadastrado!' })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashPassword,
                    phone,
                    role,
                    cpf,
                }
            })

            await tx.cart.create({
                data: { userId: newUser.id }
            })
        })

        res.status(201).json({ message: 'Cadastro Realizado!' })

    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor, tente novamente.', error })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()

        return res.status(200).json({ message: 'Usuários encontrados:', users })
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor, tente novamente.', error })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user_email = req.params.email

        const user = await prisma.user.findUnique({
            where: { email: user_email },
            include: { cart: true }
        })

        return res.status(201).json({ message: 'Usuário encontrado.', user })

    } catch (error) {
        
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const user_db = await prisma.user.findUnique({
            where: { email }
        })

        if (!user_db) { return res.status(404).json({ message: 'Usuário não encontrado.' }) }

        const isMatch = await bcrypt.compare(password, user_db.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Senha Inválida' })
        }

        const token = jwt.sign(
            {
                id: user_db.id,
                role: user_db.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        return res.status(201).json({
            message: 'Login realizado com sucesso!',
            token
        })

    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor, tente novamente.' })
    }
}