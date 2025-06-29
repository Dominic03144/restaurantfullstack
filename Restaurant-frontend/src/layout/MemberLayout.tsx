
// ✅ src/components/MemberLayout.tsx
import { Outlet } from "react-router-dom";

const MemberLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* You can add sidebar/header here */}
      <Outlet />
    </div>
  );
};

export default MemberLayout;

