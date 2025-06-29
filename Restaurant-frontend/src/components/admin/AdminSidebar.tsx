type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function AdminSidebar({ activeTab, setActiveTab }: Props) {
  const tabs = [
    { label: "Users", key: "users" },
    { label: "Restaurants", key: "restaurants" },
    { label: "Menus", key: "menus" },
    { label: "Orders", key: "orders" },
    { label: "Drivers", key: "drivers" },
    { label: "City & State", key: "location" },
    { label: "Comments", key: "comments" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Optionally reload or redirect
    window.location.reload();
  };

  return (
    <aside className="w-64 bg-gray-900 shadow-lg min-h-screen text-gray-200 flex flex-col">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700 text-yellow-400">
        Admin Panel
      </h2>
      <ul className="flex-grow">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <button
              onClick={() => setActiveTab(tab.key)}
              className={`w-full text-left px-6 py-3 transition-colors duration-200 hover:bg-yellow-600 hover:text-white rounded-r-md ${
                activeTab === tab.key
                  ? "bg-yellow-500 text-gray-900 font-bold"
                  : "text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
