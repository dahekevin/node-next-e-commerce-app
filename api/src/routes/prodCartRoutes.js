import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addProductToCart, getProductsFromCart, removeProductFromCart } from "../controllers/prodCartController.js";

const router = express.Router()

router.post('/cart/add', verifyToken, addProductToCart)

router.get('/cart/get', verifyToken, getProductsFromCart)

router.delete('/cart/delete', verifyToken, removeProductFromCart)

export default router