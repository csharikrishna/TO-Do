import cron from 'node-cron';
import Task from '../models/Task.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const notificationService = () => {
  // Check every minute for tasks due within 15 minutes
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60000);
      
      const tasks = await Task.find({
        notified: false,
        completed: false,
        deadline: { 
          $gte: now,
          $lte: fifteenMinutesFromNow 
        }
      });

      for (const task of tasks) {
        const user = await User.findById(task.userId);
        
        if (user) {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: '⏰ Task Deadline Reminder',
            html: `
              <h2>Task Deadline Reminder</h2>
              <p><strong>Task:</strong> ${task.title}</p>
              <p><strong>Description:</strong> ${task.description || 'No description'}</p>
              <p><strong>Deadline:</strong> ${task.deadline.toLocaleString()}</p>
              <p>This task is due in less than 15 minutes!</p>
            `
          });

          task.notified = true;
          await task.save();
        }
      }
    } catch (error) {
      console.error('Notification service error:', error);
    }
  });
};

export default notificationService;
