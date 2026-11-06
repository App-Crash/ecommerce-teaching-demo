// src/components/cart/CartActions.tsx
import { useI18n } from "../../features/I18nProvider";

type Props = {
  canClear: boolean;
  canCheckout: boolean;
  onClear: () => void;
  onCheckout?: () => void;
};

export function CartActions({
  canClear,
  canCheckout,
  onClear,
  onCheckout,
}: Props) {
  const { t } = useI18n();

  return (
    <div className="flex justify-between mt-4">
      <button
        className="
          px-4 py-2 rounded-md
          bg-gray-200 text-gray-900
          hover:bg-gray-300
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        disabled={!canClear}
        onClick={onClear}
      >
        {t("empty_cart")}
      </button>

      <button
        className="
          px-4 py-2 rounded-md
          bg-blue-700 text-white
          hover:bg-blue-600
          font-semibold
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        disabled={!canCheckout}
        onClick={onCheckout}
      >
        {t("checkout")}
      </button>
    </div>
  );
}
