import express from 'express'
import { createUser, getAllUsers, getUserById, userLogin } from '../controllers/userController.js'

const router = express.Router()

router.post('/user/registration', createUser)

router.get('/user/get-all', getAllUsers)

router.get('/user/get/:email', getUserById)

router.post('/login', userLogin)

export default router