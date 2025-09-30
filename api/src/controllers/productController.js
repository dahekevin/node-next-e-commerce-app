import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient()

export const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const productPrice = parseFloat(price)
        const file = req.file;        

        if (!name || !description || !price || !file) { return res.status(401).json({ message: 'Informações faltantes. Envie todas as informações do produto para cria-lo.' }) }

        if (isNaN(productPrice)) {
            return res.status(400).json({ message: 'O preço deve ser um número válido.' });
        }

        let uploadedFilename = file ? file.filename : null;

        if (!uploadedFilename) {
            return res.status(400).json({ message: 'A imagem do produto é obrigatória.' });
        }

        await prisma.product.create({
            data: {
                name,
                description,
                imageUrl: uploadedFilename,
                price: productPrice
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

        console.log('GET PRODUCTS: ', prod);
        

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
        const newFile = req.file
        const updates = req.body
        const updatedData = {}
        Object.assign(updatedData, updates)

        const existingProduct = await prisma.product.findUnique({
            where: { id: prod_id }
        })

        if (!existingProduct) {
            return res.status(404).json({ message: 'Este produto não consta na banco de dados.' })
        }
        
        if (updates.price !== undefined) {
            const productPrice = parseFloat(updates.price)
            if (isNaN(productPrice)) {
                return res.status(404).json({ message: 'O preço deve ser um número válido.' })
            }
            updatedData.price = productPrice
        }

        if (newFile) {
            updatedData.imageUrl = newFile.filename
        } else {
            updatedData.imageUrl = null
        }

        await prisma.product.update({
            where: { id: prod_id },
            data: updatedData
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