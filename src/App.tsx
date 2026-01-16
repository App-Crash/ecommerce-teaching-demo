import { ProductCard } from "./components/ProductCard";
import { CartSummary } from "./components/CartSummary";
import { Navbar } from "./components/Navbar";
import "./index.css";

import { I18nProvider, useI18n } from "./features/I18nProvider";
import { ErrorBoundary } from "./errors/ErrorBoundary";
import { ErrorModal } from "./components/ErrorModal";

import model1 from "./assets/products/model-1.jpg";
import model2 from "./assets/products/model-2.jpg";
import model3 from "./assets/products/model-3.jpg";
import model4 from "./assets/products/model-4.jpg";

import { Suspense, useState } from "react";
import { createPaymentResource } from "./checkout/paymentResource";
import { useCart } from "./features/useCart";

// ----------------- Payment Components -----------------
function Payment({
  onClose,
  clearCart,
  resource,
}: {
  onClose: () => void;
  clearCart: () => void;
  resource: ReturnType<typeof createPaymentResource>;
}) {
  resource.read();
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-green-700 font-semibold">
        {t("payment_succeeded")}
      </p>
      <button
        className="px-4 py-2 bg-blue-700 text-white rounded"
        onClick={() => {
          clearCart();
          onClose();
        }}
      >
        {t("close")}
      </button>
    </div>
  );
}

function Checkout({
  onClose,
  onError,
  clearCart,
  resource,
}: {
  onClose: () => void;
  onError: (e: Error) => void;
  clearCart: () => void;
  resource: ReturnType<typeof createPaymentResource>;
}) {
  const { t } = useI18n();

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full">
          <p className="text-blue-700 font-semibold">
            {t("processing_payment")}
          </p>
        </div>
      }
    >
      <ErrorBoundary onError={onError}>
        <Payment
          onClose={onClose}
          clearCart={clearCart}
          resource={resource}
        />
      </ErrorBoundary>
    </Suspense>
  );
}

// ----------------- Main App -----------------
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

  // ----------------- Render -----------------
  return (
    <I18nProvider>
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      <main className="pt-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>

      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-white text-gray-950 shadow-xl z-50 p-6 rounded-l-xl transform transition-transform duration-500 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {errorRef && (
          <ErrorModal errorRef={errorRef} onClose={handleErrorClose} />
        )}

        {!checkoutStarted && !errorRef && (
          <CartSummary
            onClose={() => setIsCartOpen(false)}
            onCheckout={handleCheckout}
          />
        )}

        {checkoutStarted && !errorRef && paymentResource && (
          <Checkout
            onClose={resetCheckout}
            onError={handleError}
            clearCart={clearCart}
            resource={paymentResource}
          />
        )}
      </div>
    </I18nProvider>
  );
}

export default App;
