// src/App.tsx
import "./index.css";
import { useState } from "react";

import model1 from "./assets/products/model-1.jpg";
import model2 from "./assets/products/model-2.jpg";
import model3 from "./assets/products/model-3.jpg";
import model4 from "./assets/products/model-4.jpg";

import { useCart } from "./features/useCart";
import { useI18n } from "./features/I18nProvider";
import { createPaymentResource } from "./checkout/paymentResource";

import { AppShell } from "./app/AppShell";
import { ProductGrid } from "./app/ProductGrid";
import { CartDrawer } from "./app/CartDrawer";

function App() {
  const { clearCart } = useCart();
  const { t } = useI18n();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStarted, setCheckoutStarted] = useState(false);
  const [paymentResource, setPaymentResource] =
    useState<ReturnType<typeof createPaymentResource> | null>(null);
  const [errorRef, setErrorRef] = useState<string | null>(null);

  const products = [
    { id: 1, name: "Model 1", price: 30, image: model1 },
    { id: 2, name: "Model 2", price: 33, image: model2 },
    { id: 3, name: "Model 3", price: 41, image: model3 },
    { id: 4, name: "Model 4", price: 32, image: model4 },
  ];

  // ----------------- Handlers -----------------
  const handleCheckout = () => {
    setPaymentResource(createPaymentResource(t));
    setCheckoutStarted(true);
  };

  const resetCheckout = () => {
    setCheckoutStarted(false);
    setPaymentResource(null);
  };

  const handleError = (e: Error) => {
    const ref = `ERR-${Math.random()
      .toString(36)
      .slice(2, 7)
      .toUpperCase()}`;

    console.error("Payment UI Error", ref, e);

    setErrorRef(ref);
    resetCheckout();
  };

  const handleErrorClose = () => {
    setErrorRef(null);
    resetCheckout();
  };

  return (
    <AppShell onCartClick={() => setIsCartOpen(true)}>
      <ProductGrid products={products} />

      <CartDrawer
        isOpen={isCartOpen}
        checkoutStarted={checkoutStarted}
        paymentResource={paymentResource}
        errorRef={errorRef}
        onCloseCart={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
        onCheckoutReset={resetCheckout}
        onError={handleError}
        onErrorClose={handleErrorClose}
        clearCart={clearCart}
      />
    </AppShell>
  );
}

export default App;
