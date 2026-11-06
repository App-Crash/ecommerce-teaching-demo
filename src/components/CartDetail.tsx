// src/components/CartDetail.tsx

import { useCart } from "../features/useCart";
import type { CartLineView } from "../features/useCart";

type ProductProps = {
  product: CartLineView;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(value);

export function CartDetail({ product }: ProductProps) {
  const { removeItem } = useCart();

  return (
    <tr className="border-b border-gray-200 last:border-none">
      <td className="py-2">{product.name}</td>
      <td className="py-2 text-right">{formatCurrency(product.price)}</td>
      <td className="py-2 text-right">{product.quantity}</td>
      <td className="py-2 text-right">{formatCurrency(product.subtotal)}</td>
      <td className="py-2 text-center">
        <button
          onClick={() => removeItem(product.id)}
          className="text-red-600 
            hover:text-red-800
            px-1 py-1 rounded-md 
            text-right"
            aria-label="Remove item"
        >🗑️
        </button>
      </td>
    </tr>
  );
}
