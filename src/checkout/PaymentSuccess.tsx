// src/checkout/PaymentSuccess.tsx
import { useI18n } from "../features/I18nProvider";
import { createPaymentResource } from "./paymentResource";

type Props = {
  onClose: () => void;
  clearCart: () => void;
  resource: ReturnType<typeof createPaymentResource>;
};

export function PaymentSuccess({ onClose, clearCart, resource }: Props) {
  resource.read(); // Suspense boundary responsibility remains upstream
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
