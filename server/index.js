import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';
import notificationService from './utils/notificationService.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

notificationService(); // Start cron job for notifications

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
