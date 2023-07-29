import express from 'express'
import { getAllUsers, registerUser, loginUser } from '../controllers/userController';

const router = express.Router();

// Create a user
router.get('/', getAllUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)


export default router