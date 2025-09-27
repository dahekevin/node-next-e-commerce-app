import express from "express";
import { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById } from "../controllers/productController.js";
import { isAdmin, verifyToken } from "../middleware/auth.js";

const router = express.Router()

router.post('/product/create', verifyToken, isAdmin, createProduct)

router.get('/product/get-all', getAllProducts)

router.get('/product/get/:id', getProductById)

router.patch('/product/update/:id', verifyToken, isAdmin, updateProduct)

router.delete('/product/delete/:id', verifyToken, isAdmin, deleteProduct)

export default router