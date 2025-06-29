import { Outlet, Link } from "react-router-dom";

const MemberDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-yellow-500 mb-4">
        Welcome to Your Dashboard
      </h1>
      <p className="text-lg mb-6">
        Use the sidebar to browse menu, view orders, or logout.
      </p>

      <nav className="flex gap-6 mb-6">
        <Link to="/member/menu" className="text-blue-500 hover:underline">
          Menu
        </Link>
        <Link to="/member/orders" className="text-blue-500 hover:underline">
          My Orders
        </Link>
      </nav>

      {/* Nested routes render here */}
      <Outlet />
    </div>
  );
};

export default MemberDashboard;
