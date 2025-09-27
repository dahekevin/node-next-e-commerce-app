import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient()

export const createProduct = async (req, res) => {
    try {
        const { name, description, imageUrl, price } = req.body

        await prisma.product.create({
            data: {
                name,
                description,
                imageUrl,
                price
            }
        })

        res.status(201).json({ message: 'Produto criado com sucesso!' })

    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor, tente novamente.', error })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const prod = await prisma.product.findMany()

        return res.status(200).json({ message: 'Retornando lista de produtos.', prod })
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor, tente novamente.', error })
    }
}

export const getProductById = async (req, res) => {
    try {
        const prod_id = req.params.id

        const prod = await prisma.product.findUnique({
            where: { id: prod_id }
        })

        return res.status(201).json({ message: 'Produto Encontrado.', prod })

    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor, tente novamente.', error })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const prod_id = req.params.id
        const updates = req.body

        const existingProduct = await prisma.product.findUnique({
            where: { id: prod_id }
        })

        if (!existingProduct) {
            return res.status(404).json({ message: 'Este produto não consta na banco de dados.' })
        }

        await prisma.product.update({
            where: { id: prod_id },
            data: updates
        })

        return res.status(201).json({ message: 'Produto Atualizado com sucesso!' })

    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor, tente novamente.', error })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const prod_id = req.params.id        

        const existingProduct = await prisma.product.findUnique({
            where: { id: prod_id }
        })

        if (!existingProduct) {
            return res.status(404).json({ message: 'Este produto não consta na banco de dados.' })
        }

        await prisma.product.delete({
            where: { id: prod_id }
        })

        return res.status(204).json({ message: 'Produto deletado com sucesso!' })

    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor, tente novamente.', error })
    }
}