import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({
    message: 'Welcome to your dashboard!',
    user: (req as any).user,
  });
});

export default router;
