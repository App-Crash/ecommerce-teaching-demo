// src/components/CartSummary.tsx
import { useCart } from "../features/useCart";
import { CartHeader } from "./cart/CartHeader";
import { CartTable } from "./cart/CartTable";
import { CartActions } from "./cart/CartActions";

type CartProps = {
  onClose: () => void;
  onCheckout?: () => void;
};

export function CartSummary({ onClose, onCheckout }: CartProps) {
  const { lines, canClear, clearCart } = useCart();
  const canCheckout = lines.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <CartHeader onClose={onClose} />
      <CartTable lines={lines} />
      <CartActions
        canClear={canClear}
        canCheckout={canCheckout}
        onClear={clearCart}
        onCheckout={onCheckout}
      />
    </div>
  );
}
