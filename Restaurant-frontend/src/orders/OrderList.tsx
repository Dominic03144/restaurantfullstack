// src/features/orders/OrderList.tsx
import { useSelector } from "react-redux";
import { useGetOrdersByUserIdQuery } from "../api/orderAPI";
import type { RootState } from "../app/store";
import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const OrderList = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: orders, isLoading, isError } = useGetOrdersByUserIdQuery(userId ?? 0, { skip: userId === undefined });

  if (isLoading) return <div className="p-4">Loading orders...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to load orders.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      {orders?.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders?.map((order: { id: string | number; status: string; totalAmount: number; createdAt: string | number | Date; menuItems: any[]; }) => (
            <li key={order.id} className="border p-4 rounded shadow">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
              <p><strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <div>
                <strong>Items:</strong>
                <ul className="ml-4 list-disc">
                  {order.menuItems.map((item, i) => (
                    <li key={i}>
                      Menu ID: {item.menuItemId} — Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
