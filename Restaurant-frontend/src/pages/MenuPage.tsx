import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";
import { ShoppingCart } from "lucide-react";
import CartPanel from "../components/CartPanel";
import MenuItemCard from "../components/MenuItemCard";

const BASE_URL = "http://localhost:3000/api/menuitem";

export type MenuItem = {
  id: number;
  menuName: string;
  description: string;
  ingredients: string;
  price: number;
  active: boolean;
};

type MenuPageProps = {
  embedded?: boolean;
};

const MenuPage = ({ embedded = false }: MenuPageProps) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const fetchMenu = async () => {
      const token = localStorage.getItem("token");

      if (!token && !embedded) {
        console.warn("⛔ No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(BASE_URL, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const sanitized = Array.isArray(response.data)
          ? response.data
              .filter((item: any) => item.menuItemId !== undefined)
              .map((item: any) => ({
                id: item.menuItemId,
                menuName: item.menuName,
                description: item.description || "",
                ingredients: item.ingredients || "",
                price:
                  typeof item.price === "number"
                    ? item.price
                    : parseFloat(item.price) || 0,
                active: item.active ?? true,
              }))
          : [];

        setMenuItems(sanitized);
      } catch (err: any) {
        console.error("❌ Error fetching menu:", err);
        if (!embedded && (err.response?.status === 401 || err.response?.status === 403)) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [navigate, embedded]);

  const handleAdd = (item: MenuItem) => {
    dispatch(addToCart({ id: item.id, menuName: item.menuName, price: item.price }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleConfirmOrder = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("🚨 You must be logged in to confirm your order.");
      navigate("/login");
      return;
    }

    if (confirm("Are you sure you want to confirm this order?")) {
      dispatch(clearCart());
      setShowCart(false);
      alert("✅ Order confirmed!");
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-black p-6 relative">
      {!embedded && (
        <h1 className="text-3xl font-bold text-center text-yellow-500 mb-6">
          🍽️ Browse Our Menu
        </h1>
      )}

      {/* Cart Button */}
      <button
        onClick={() => setShowCart(!showCart)}
        className="fixed top-4 right-6 bg-yellow-400 hover:bg-yellow-500 p-3 rounded-full shadow-lg z-50"
      >
        <ShoppingCart />
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Panel */}
      {showCart && (
        <CartPanel
          cartItems={cartItems}
          totalPrice={totalPrice}
          onConfirmOrder={handleConfirmOrder}
        />
      )}

      {/* Menu Items */}
      {!loading && menuItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {menuItems.map((item) => {
            const quantity = cartItems.find((i) => i.id === item.id)?.quantity || 0;

            return (
              <MenuItemCard
                key={item.id}
                id={item.id}
                name={item.menuName}
                description={item.description}
                ingredients={item.ingredients}
                price={item.price}
                quantity={quantity}
                onAdd={() => handleAdd(item)}
                onRemove={() => handleRemove(item.id)}
              />
            );
          })}
        </div>
      ) : !loading ? (
        <p className="text-center text-gray-500">No menu items found.</p>
      ) : null}
    </div>
  );
};

export default MenuPage;
