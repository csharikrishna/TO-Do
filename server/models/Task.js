import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  deadline: { type: Date, required: true },
  notified: { type: Boolean, default: false },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
