import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/');
  };

  const userEmail = localStorage.getItem('userEmail') || 'User';

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/dashboard" className="text-xl font-bold flex items-center">
            <span className="mr-2">📝</span>
            TaskManager
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {userEmail}</span>
            <Link 
              to="/dashboard" 
              className="hover:text-blue-200 transition-colors"
            >
              Dashboard
            </Link>
            <button 
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
