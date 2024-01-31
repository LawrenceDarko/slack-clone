import express from 'express'
import { getAllUsers, registerUser, loginUser, getAUser } from '../controllers/userController';

const router = express.Router();

// Create a user
router.get('/', getAllUsers)
router.get('/:userId', getAUser)
router.post('/register', registerUser)
router.post('/login', loginUser)


export default router