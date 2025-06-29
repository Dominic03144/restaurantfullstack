import AdminSidebar from "../../components/admin/AdminSidebar";
import { useState } from "react";
import UserTable from "../../components/admin/UserTable";
import RestaurantTable from "../../components/admin/RestaurantTable";
import MenuTable from "../../components/admin/MenuTable";
import OrderTable from "../../components/admin/OrderTable";
import DriverTable from "../../components/admin/DriverTable";
import CityStateTable from "../../components/admin/CityStateTable";
import CommentTable from "../../components/admin/CommentTable";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("users");

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserTable />;
      case "restaurants":
        return <RestaurantTable />;
      case "menus":
        return <MenuTable />;
      case "orders":
        return <OrderTable />;
      case "drivers":
        return <DriverTable />;
      case "location":
        return <CityStateTable />;
      case "comments":
        return <CommentTable />;
      default:
        return <UserTable />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
    </div>
  );
};

export default AdminPage;
