import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import {
  useGetOrdersByUserIdQuery,
  useCreateOrderMutation,
} from "../api/orderAPI";
import { useGetAddressesByUserIdQuery } from "../api/addressAPI";
import { toast } from "react-toastify";

const MyOrders = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.userId;

  const {
    data: orders,
    isLoading: loadingOrders,
    isError,
  } = useGetOrdersByUserIdQuery(userId ?? 0, { skip: !userId });

  const {
    data: addresses = [],
    isLoading: loadingAddresses,
    isError: addressError,
  } = useGetAddressesByUserIdQuery(userId ?? 0, { skip: !userId });

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [createOrder, { isLoading: creatingOrder }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address.");
      return;
    }

    const newOrder = {
      userId,
      restaurantId: 1,
      deliveryAddressId: selectedAddressId,
      estimatedDeliveryTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      finalPrice: 750,
      menuItems: [
        { menuItemId: 2, quantity: 1 },
        { menuItemId: 3, quantity: 2 },
      ],
    };

    try {
      const response = await createOrder(newOrder).unwrap();
      toast.success("🎉 Order placed successfully!");
      console.log("✅ Order placed:", response);
    } catch (err: any) {
      console.error("❌ Order failed:", err?.data || err);
      toast.error(`❌ Failed to place order: ${err?.data?.error || "Unknown error"}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">📦 Orders You’ve Made</h1>

      {/* ✅ Address selection */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-300">
          Select Delivery Address:
        </label>
        {loadingAddresses ? (
          <p className="text-gray-400">Loading addresses...</p>
        ) : addressError ? (
          <p className="text-red-500">Failed to load addresses.</p>
        ) : addresses.length === 0 ? (
          <p className="text-yellow-400">No saved addresses found.</p>
        ) : (
          <select
            value={selectedAddressId ?? ""}
            onChange={(e) => setSelectedAddressId(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="">-- Choose Address --</option>
            {addresses.map((addr: any) => (
              <option key={addr.addressesId} value={addr.addressesId}>
                {addr.street}, {addr.city} ({addr.type})
              </option>
            ))}
          </select>
        )}
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={creatingOrder}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {creatingOrder ? "Placing Order..." : "Place New Order"}
      </button>

      {loadingOrders ? (
        <p>Loading your orders...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load orders.</p>
      ) : orders?.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order: any) => (
            <li
              key={order.ordersId}
              className="p-4 bg-gray-800 rounded shadow flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-white">
                  Order #{order.ordersId} – Ksh {order.finalPrice}
                </p>
                <p className="text-sm text-gray-400">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      order.order_status === "pending"
                        ? "text-yellow-400"
                        : order.order_status === "delivered"
                        ? "text-green-400"
                        : "text-blue-400"
                    }`}
                  >
                    {order.order_status}
                  </span>
                </p>
              </div>
              <p className="text-sm text-gray-400">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
