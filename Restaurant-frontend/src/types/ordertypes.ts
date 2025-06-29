// src/types/orderTypes.ts

// For creating a new order
export interface OrderPayload {
  restaurantId: number;
  estimatedDeliveryTime: string; // ISO string
  actualDeliveryTime?: string;
  deliveryAddressId: number;
  userId: number;
  driverId: number;
  price: string;
  discount: string;
  finalPrice: string;
  comment?: string;
}

// Returned full order from backend
export interface Order {
  ordersId: number;
  restaurantId: number;
  estimatedDeliveryTime: string;
  actualDeliveryTime: string | null;
  deliveryAddressId: number;
  userId: number;
  driverId: number;
  price: string;
  discount: string;
  finalPrice: string;
  order_status: "pending" | "preparing" | "delivered" | "cancelled"; // example values
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

// For updating order status only
export interface UpdateOrderStatusPayload {
  ordersId: number;
  order_status: string;
}

// For updating entire order details
export interface UpdateOrderPayload {
  ordersId: number;
  updates: Partial<OrderPayload>;
}
