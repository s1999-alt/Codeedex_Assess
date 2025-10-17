import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700 tracking-wide hover:text-blue-900 transition-colors"
        >
          Blog<span className="text-indigo-500">App</span>
        </Link>

        <div className="flex items-center gap-6">
          {token ? (
            <>
              <Link
                to="/"
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/create"
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                Create
              </Link>
              <Link
                to="/my-posts"
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                My Posts
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white font-semibold px-4 py-1.5 rounded-md hover:bg-blue-700 transition-all shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
