import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-base-200">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <button onClick={handleLogout} className="btn btn-error">
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
