// src/components/MemberLayout.tsx
import { Outlet } from "react-router-dom";
import MemberSidebar from "./MemberSidebar";

const MemberLayout = () => {
  return (
    <div className="flex min-h-screen">
      <MemberSidebar />
      <main className="flex-1 bg-black text-white p-6">
        <Outlet /> {/* Renders MenuPage, MyOrders, etc */}
      </main>
    </div>
  );
};

export default MemberLayout;
