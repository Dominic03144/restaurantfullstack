import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const MemberSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { label: "Home", path: "/member/dashboard" },
    { label: "Menu", path: "/member/menu" },
    { label: "My Orders", path: "/member/my-orders" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 space-y-6 min-h-screen shadow-lg flex flex-col">
      <h2 className="text-2xl font-bold text-yellow-400">🍽️ Member Panel</h2>

      <nav className="flex flex-col gap-4 mt-8 flex-grow" aria-label="Member navigation">
        {navItems.map(({ label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`text-left py-2 px-4 rounded-lg transition focus:outline-yellow-400 ${
                isActive
                  ? "bg-yellow-500 text-gray-900 font-bold"
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
              type="button"
            >
              {label}
            </button>
          );
        })}

        <button
          onClick={handleLogout}
          className="text-left bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition focus:outline-yellow-400 mt-auto"
          type="button"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default MemberSidebar;
