// src/checkout/CheckoutFlow.tsx
import { Suspense } from "react";
import { useI18n } from "../features/I18nProvider";
import { ErrorBoundary } from "../errors/ErrorBoundary";
import { createPaymentResource } from "./paymentResource";
import { PaymentSuccess } from "./PaymentSuccess";

type Props = {
  onClose: () => void;
  onError: (e: Error) => void;
  clearCart: () => void;
  resource: ReturnType<typeof createPaymentResource>;
};

export function CheckoutFlow({
  onClose,
  onError,
  clearCart,
  resource,
}: Props) {
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
        <PaymentSuccess
          onClose={onClose}
          clearCart={clearCart}
          resource={resource}
        />
      </ErrorBoundary>
    </Suspense>
  );
}
