import Task from '../models/Task.js';

export const addTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const task = new Task({
      userId: req.user.id,
      title,
      description,
      deadline: new Date(deadline)
    });
    
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ deadline: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
