import express from 'express'
import refreshAToken from '../controllers/tokenController';

const router = express.Router();

// Refresh a token
router.post('/', refreshAToken)



export default router