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
import {ScrollPositionManager} from "./components/ScrollPositionManager";

function App() {
  const { clearCart } = useCart();
  const { t } = useI18n();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStarted, setCheckoutStarted] = useState(false);
  const [paymentResource, setPaymentResource] =
    useState<ReturnType<typeof createPaymentResource> | null>(null);
  const [errorRef, setErrorRef] = useState<string | null>(null);

  const products = [
    { id: 1, name: "Shoe 1", price: 30, image: model1 },
    { id: 2, name: "Shoe 2", price: 33, image: model2 },
    { id: 3, name: "Shoe 3", price: 41, image: model3 },
    { id: 4, name: "Shoe 4", price: 32, image: model4 },
    { id: 5, name: "Shoe 5", price: 30, image: model1 },
    { id: 6, name: "Shoe 6", price: 36, image: model2 },
    { id: 7, name: "Shoe 7", price: 41, image: model3 },
    { id: 8, name: "Shoe 8", price: 44, image: model4 },
    { id: 9, name: "Shoe 9", price: 41, image: model3 },
    { id: 10, name: "Shoe 10", price: 30, image: model1 },
    { id: 11, name: "Shoe 11", price: 30, image: model1 },
    { id: 12, name: "Shoe 12", price: 33, image: model2 },
    { id: 13, name: "Shoe 13", price: 41, image: model3 },
    { id: 14, name: "Shoe 14", price: 32, image: model4 },
    { id: 15, name: "Shoe 15", price: 30, image: model1 },
    { id: 16, name: "Shoe 16", price: 36, image: model2 },
    { id: 17, name: "Shoe 17", price: 41, image: model3 },
    { id: 18, name: "Shoe 18", price: 44, image: model4 },
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
      <ScrollPositionManager />
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
