import { useEffect, useState } from "react";

// ✅ Mock Menu Items
type MenuItem = {
  menuItemId: number;
  menuName: string;
  description: string;
  ingredients: string;
  price: string;
  active: boolean;
};

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // ✅ Mocking menu fetch
    setTimeout(() => {
      setMenuItems([
        {
          menuItemId: 1,
          menuName: "Pizza Margherita",
          description: "Classic pizza with tomato and mozzarella",
          ingredients: "Tomato, Mozzarella, Basil",
          price: "850",
          active: true,
        },
        {
          menuItemId: 2,
          menuName: "Beef Burger",
          description: "Juicy grilled beef burger",
          ingredients: "Beef, Lettuce, Tomato, Cheese",
          price: "750",
          active: true,
        },
      ]);
    }, 500);
  }, []);

  const handleOrder = (item: MenuItem) => {
    setToastMessage(`✅ Order placed for: ${item.menuName}`);
    setTimeout(() => setToastMessage(""), 3000); // Hide after 3s
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <div
          key={item.menuItemId}
          className="bg-white rounded-2xl shadow-lg p-4 hover:scale-[1.02] transition"
        >
          <h2 className="text-xl font-bold text-blue-800">{item.menuName}</h2>
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          <p className="text-sm italic mt-1 text-gray-500">{item.ingredients}</p>
          <p className="text-lg font-semibold text-green-700 mt-2">Ksh {item.price}</p>

          <button
            onClick={() => handleOrder(item)}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold transition"
          >
            Order Now
          </button>
        </div>
      ))}

      {/* ✅ Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-xl animate-slide-in-right z-50">
          <p className="font-medium">{toastMessage}</p>
        </div>
      )}
    </div>
  );
}
