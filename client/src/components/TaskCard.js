import { useState } from 'react';
import API from '../api';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      await API.put(`/tasks/${task._id}`, { completed: !isCompleted });
      setIsCompleted(!isCompleted);
      onUpdate();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        await API.delete(`/tasks/${task._id}`);
        onDelete();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task');
      } finally {
        setLoading(false);
      }
    }
  };

  const now = new Date();
  const deadline = new Date(task.deadline);
  const isOverdue = deadline < now && !isCompleted;
  const isUpcoming = deadline < new Date(now.getTime() + 24 * 60 * 60 * 1000);

  return (
    <div className={`p-4 border rounded-lg shadow-sm transition-all ${
      isCompleted ? 'bg-green-50 border-green-200' : 
      isOverdue ? 'bg-red-50 border-red-200' : 
      isUpcoming ? 'bg-yellow-50 border-yellow-200' : 
      'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${
            isCompleted ? 'line-through text-gray-500' : ''
          }`}>
            {task.title}
          </h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Due: {deadline.toLocaleString()}
          </p>
          {isOverdue && !isCompleted && (
            <p className="text-red-600 text-sm font-semibold mt-1">
              ⚠️ Overdue
            </p>
          )}
          {isUpcoming && !isCompleted && !isOverdue && (
            <p className="text-yellow-600 text-sm font-semibold mt-1">
              ⏰ Due Soon
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleToggleComplete}
            disabled={loading}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              isCompleted 
                ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            } disabled:opacity-50`}
          >
            {loading ? '...' : isCompleted ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors disabled:opacity-50"
          >
            {loading ? '...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
