// src/app/CartDrawer.tsx
import { CartSummary } from "../components/CartSummary";
import { ErrorModal } from "../components/ErrorModal";
import { CheckoutFlow } from "../checkout/CheckoutFlow";
import { createPaymentResource } from "../checkout/paymentResource";

type Props = {
  isOpen: boolean;
  checkoutStarted: boolean;
  paymentResource: ReturnType<typeof createPaymentResource> | null;
  errorRef: string | null;
  onCloseCart: () => void;
  onCheckout: () => void;
  onCheckoutReset: () => void;
  onError: (e: Error) => void;
  onErrorClose: () => void;
  clearCart: () => void;
};

export function CartDrawer({
  isOpen,
  checkoutStarted,
  paymentResource,
  errorRef,
  onCloseCart,
  onCheckout,
  onCheckoutReset,
  onError,
  onErrorClose,
  clearCart,
}: Props) {
  return (
    <div
      className={`fixed top-0 right-0 h-screen w-80 bg-white text-gray-950 shadow-xl z-50 p-6 rounded-l-xl transform transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {errorRef && (
        <ErrorModal errorRef={errorRef} onClose={onErrorClose} />
      )}

      {!checkoutStarted && !errorRef && (
        <CartSummary onClose={onCloseCart} onCheckout={onCheckout} />
      )}

      {checkoutStarted && !errorRef && paymentResource && (
        <CheckoutFlow
          onClose={onCheckoutReset}
          onError={onError}
          clearCart={clearCart}
          resource={paymentResource}
        />
      )}
    </div>
  );
}
