import { useEffect, useState } from "react";

type MenuItem = {
  menuItemId: number;
  menuName: string;
  description: string;
  price: string;
  ingredients: string;
  restaurantId: number;
  categoryId: number;
  active: boolean;
};

export default function MenuTable() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/menuitem");
      if (!res.ok) throw new Error("Failed to fetch menu items");
      const data = await res.json();
      setMenuItems(data);
    } catch (err: any) {
      setError(err.message || "Failed to load menu items");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this menu item?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/menuitem/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete menu item");

      setMenuItems((prev) => prev.filter((item) => item.menuItemId !== id));
    } catch (err: any) {
      setError(err.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div className="p-4 bg-black min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-yellow-400">Menu Items</h2>

      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

      <table className="w-full rounded-lg border border-blue-600">
        <thead className="bg-purple-900 text-yellow-300 text-left uppercase tracking-wide">
          <tr>
            <th className="p-3 border-r border-blue-600">Name</th>
            <th className="p-3 border-r border-blue-600">Description</th>
            <th className="p-3 border-r border-blue-600">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.menuItemId} className="border-t border-blue-700 hover:bg-blue-900 transition-colors">
              <td className="p-3 border-r border-blue-700 text-yellow-400 font-semibold">{item.menuName}</td>
              <td className="p-3 border-r border-blue-700 text-yellow-400">{item.description}</td>
              <td className="p-3 border-r border-blue-700 text-yellow-400">${item.price}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(item.menuItemId)}
                  className="text-red-400 hover:text-red-600 font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
