import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
