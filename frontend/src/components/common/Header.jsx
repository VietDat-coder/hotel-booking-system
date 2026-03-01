import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container-page flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary-600">HotelBooking</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/hotels"
            className={({ isActive }) =>
              isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
            }
          >
            Hotels
          </NavLink>
          {user && user.role === 'ADMIN' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
              }
            >
              Admin
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {token ? (
            <>
              <NavLink
                to="/bookings"
                className={({ isActive }) =>
                  isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }
              >
                My Bookings
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }
              >
                {user ? user.name : 'Profile'}
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm border rounded-md border-gray-300 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 text-sm border rounded-md border-gray-300 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

