import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import {
  useGetOrdersByUserIdQuery,
  useCreateOrderMutation,
} from "../api/orderAPI";
import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const OrderPage = () => {
  const user = useSelector((state: any) => state.auth.user);
  const userId = user?.userId;

  const {
    data: orders,
    isLoading: loadingOrders,
    isError,
  } = useGetOrdersByUserIdQuery(userId ?? 0, { skip: userId === undefined });

  const [createOrder, { isLoading: creatingOrder }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    const newOrder = {
      userId: userId,
      restaurantId: 1,
      deliveryAddressId: 1,
      estimatedDeliveryTime: new Date(Date.now() + 30 * 60000).toISOString(),
      driverId: 1,
      price: "800",
      discount: "0",
      finalPrice: "800",
      comment: "Quick delivery please",
    };

    try {
      await createOrder(newOrder).unwrap();
    } catch (err) {
      console.error("❌ Error placing order:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">📦 Orders You’ve Made</h1>

      <button
        onClick={handlePlaceOrder}
        disabled={creatingOrder}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {creatingOrder ? "Placing Order..." : "Place New Order"}
      </button>

      {loadingOrders ? (
        <p className="text-white">Loading your orders...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load orders.</p>
      ) : orders?.length === 0 ? (
        <p className="text-white">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order: { ordersId: string | number; finalPrice: string | number; order_status: string; createdAt: string | number | Date; }) => (
            <li
              key={order.ordersId}
              className="p-4 bg-gray-100 rounded shadow flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  Order #{order.ordersId} – Ksh {order.finalPrice}
                </p>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span className="font-medium text-blue-700">
                    {order.order_status}
                  </span>
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderPage;
