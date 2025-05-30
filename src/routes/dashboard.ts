import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getDashboardData } from '../controllers/dashboardController';
const router = express.Router();

router.get('/dashboard', authenticateToken, getDashboardData);
// router.get('/dashboard', authenticateToken, (req, res) => {
//   res.json({
//     message: 'Welcome to your dashboard!',
//     user: (req as any).user,
//   });
// });

export default router;
