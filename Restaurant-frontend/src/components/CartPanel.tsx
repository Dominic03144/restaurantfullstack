// src/components/CartPanel.tsx
import { useState } from "react";
import type { CartItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
} from "../features/cart/cartSlice";

type CartPanelProps = {
  cartItems: CartItem[];
  totalPrice: number;
  onConfirmOrder: () => void;
};

const CartPanel = ({ cartItems, totalPrice, onConfirmOrder }: CartPanelProps) => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="fixed right-4 top-16 w-80 bg-white border shadow-xl p-5 rounded-lg z-50">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4 max-h-64 overflow-y-auto divide-y">
            {cartItems.map((item) => (
              <li key={item.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{item.menuName}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="px-2 py-0.5 bg-red-500 text-white rounded text-sm"
                    >
                      -
                    </button>
                    <button
                      onClick={() => dispatch(addToCart({ id: item.id, menuName: item.menuName, price: item.price }))}
                      className="px-2 py-0.5 bg-green-500 text-white rounded text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">
                  Ksh {(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="font-semibold text-right text-lg mb-4">
            Total: Ksh {totalPrice.toFixed(2)}
          </div>

          <button
            onClick={() => setShowConfirm(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full py-2 rounded"
          >
            🧾 Order Now
          </button>

          {/* Confirm Order Dialog */}
          {showConfirm && (
            <div className="mt-4 p-4 bg-gray-100 border rounded-lg text-center shadow-md">
              <p className="mb-3 font-medium text-gray-800">Confirm your order?</p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                  onClick={() => {
                    setShowConfirm(false);
                    onConfirmOrder();
                  }}
                >
                  Yes
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  onClick={() => setShowConfirm(false)}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartPanel;
