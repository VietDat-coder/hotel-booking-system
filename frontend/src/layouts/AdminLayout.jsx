import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 font-bold text-xl border-b">Admin Panel</div>
        <nav className="p-4 space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/hotels"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Hotels
          </NavLink>
          <NavLink
            to="/admin/rooms"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Rooms
          </NavLink>
          <NavLink
            to="/admin/bookings"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Bookings
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Users
          </NavLink>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-14 flex items-center px-6 font-medium">
          Hotel Booking Admin
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

