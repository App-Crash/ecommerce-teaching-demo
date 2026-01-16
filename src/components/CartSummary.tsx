import { useCart } from "../features/useCart";
import { CartDetail } from "./CartDetail";
import { useI18n } from "../features/I18nProvider";

type CartProps = {
  onClose: () => void;
  onCheckout?: () => void;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(value);

export function CartSummary({ onClose, onCheckout }: CartProps) {
  const { lines, canClear, clearCart } = useCart();
  const { t } = useI18n();

  const canCheckout = lines.length > 0;

  const total = lines.reduce((sum, line) => sum + line.subtotal, 0);

  const handleCheckout = () => {
    if (!canCheckout) return;
    if (onCheckout) onCheckout();
    else console.log("Checkout started (not yet implemented)");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Close */}
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-3 py-1 rounded-md bg-gray-900 text-white hover:bg-gray-700"
        >
          {t("close")}
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gray-900">
        {t("cart_title")}
      </h2>

      <table className="w-full text-gray-900">
        <thead className="border-b border-gray-200">
          <tr>
            <th className="text-left py-2">{t("product")}</th>
            <th className="text-left py-2">{t("price")}</th>
            <th className="text-left py-2">{t("qty")}</th>
            <th className="text-left py-2">{t("subtotal")}</th>
            <th className="text-left py-2">{t("remove")}</th>
          </tr>
        </thead>

        <tbody>
          {lines.map((p) => (
            <CartDetail key={p.id} product={p} />
          ))}
        </tbody>

        {/* Total */}
        <tfoot className="border-t border-gray-300">
          <tr>
            <td colSpan={3} className="py-3 font-semibold text-right">
              {t("total")}
            </td>
            <td className="py-3 font-semibold">
              {formatCurrency(total)}
            </td>
            <td />
          </tr>
        </tfoot>
      </table>

      <div className="flex justify-between mt-4">
        <button
          className="
            px-4 py-2 rounded-md
            bg-gray-200 text-gray-900
            hover:bg-gray-300
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          disabled={!canClear}
          onClick={clearCart}
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
          onClick={handleCheckout}
        >
          {t("checkout")}
        </button>
      </div>
    </div>
  );
}
