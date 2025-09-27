import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient()

export const addProductToCart = async (req, res) => {
    try {
        const userId = req.user.id
        const { productId, quantity } = req.body

        const userCart = await prisma.cart.findUnique({
            where: { userId },
            select: { id: true }
        })

        if (!userCart) { return res.status(404).json({ message: 'Carrinho não encontrado para este usuário.' }) }

        const cartId = userCart.id

        const existingProducts = await prisma.productInCart.findUnique({
            where: {
                productId_cartId: { productId, cartId }
            }
        })

        let updatedCartProduct

        if (existingProducts) {
            updatedCartProduct = await prisma.productInCart.update({
                where: { productId_cartId: productId, cartId },
                data: { quantity: existingProducts.quantity + quantity }
            })
        } else {
            updatedCartProduct = await prisma.productInCart.create({
                data: {
                    productId,
                    cartId,
                    quantity
                }
            })
        }

        return res.status(200).json({ message: 'Produto criado/atualizado no carrinho.', updatedCartProduct })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho.' });
    }
}

export const getProductsFromCart = async (req, res) => {
    try {
        const userId = req.user.id

        const userCart = await prisma.cart.findUnique({
            where: { userId },
            select: { id: true }
        })

        if (!userCart) { return res.status(404).json({ message: 'Carrinho não encontrado para este usuário.' }) }

        const cartId = userCart.id

        const prod = await prisma.productInCart.findMany({
            where: { cartId }
        })

        return res.status(201).json({ message: 'Produtos encontrados:', prod })
    } catch (error) {
        console.error(error);
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }
}

export const removeProductFromCart = async (req, res) => {
    try {
        const userId = req.user.id
        const productId = req.body.productId

        const userCart = await prisma.cart.findUnique({
            where: { userId },
            select: { id: true }
        })

        if (!userCart) { return res.status(404).json({ message: 'Carrinho não encontrado para este usuário.' }) }

        const cartId = userCart.id

        const prod = await prisma.productInCart.delete({
            where: { productId_cartId: { productId, cartId } }
        })

        return res.status(202).json({ message: 'Produto removido do carrinho.', product : prod })

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'O produto não estava no carrinho.' });
        }
        console.error(error);
        return res.status(500).json({ message: 'Erro ao remover produto do carrinho.' });
    }
}