// src/components/MenuItemCard.tsx

import type { FC } from "react";

export type MenuItemCardProps = {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
};

const MenuItemCard: FC<MenuItemCardProps> = ({
  name,
  description,
  ingredients,
  price,
  quantity,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="bg-white border shadow-md rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{name}</h2>
        {description && (
          <p className="text-sm text-gray-600 mb-2">{description}</p>
        )}
        <p className="text-xs text-gray-500 mb-2 italic">
          Ingredients: {ingredients || "N/A"}
        </p>
        <p className="text-yellow-600 font-bold text-lg">
          Ksh {price.toFixed(2)}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {quantity === 0 ? (
          <button
            onClick={onAdd}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold w-full py-2 rounded transition"
            aria-label="Add item to cart"
          >
            Add to Cart
          </button>
        ) : (
          <>
            <button
              onClick={onAdd}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-3 py-1 rounded"
              aria-label="Increase quantity"
            >
              +
            </button>
            <span
              className="min-w-[20px] text-center font-bold"
              aria-label={`Quantity: ${quantity}`}
            >
              {quantity}
            </span>
            <button
              onClick={onRemove}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded"
              aria-label="Decrease quantity"
            >
              -
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
