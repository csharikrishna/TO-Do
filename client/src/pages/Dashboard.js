import { useEffect, useState } from 'react';
import API from '../api';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    deadline: '' 
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await API.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post('/tasks/add', newTask);
      setNewTask({ title: '', description: '', deadline: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Error adding task');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const now = new Date();
  const upcomingTasks = tasks.filter(task => 
    !task.completed && new Date(task.deadline) > now
  );
  const completedTasks = tasks.filter(task => task.completed);
  const overdueTasks = tasks.filter(task => 
    !task.completed && new Date(task.deadline) < now
  );

  // Get minimum datetime for input (current time)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Upcoming Tasks</h3>
            <p className="text-2xl font-bold text-blue-600">{upcomingTasks.length}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800">Overdue Tasks</h3>
            <p className="text-2xl font-bold text-red-600">{overdueTasks.length}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">Completed Tasks</h3>
            <p className="text-2xl font-bold text-green-600">{completedTasks.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Task Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Title *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task description (optional)"
                rows="3"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline *
              </label>
              <input
                type="datetime-local"
                required
                min={getMinDateTime()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTask.deadline}
                onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Adding Task...' : 'Add Task'}
            </button>
          </form>
        </div>

        {/* Task List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No tasks yet.</p>
                <p className="text-sm text-gray-400">Add your first task to get started!</p>
              </div>
            ) : (
              tasks
                .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                .map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onUpdate={fetchTasks}
                    onDelete={fetchTasks}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
