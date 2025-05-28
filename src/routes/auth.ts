import express from 'express';
import authController from '../controllers/authcontroller';

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.registerUser);

export default router;
