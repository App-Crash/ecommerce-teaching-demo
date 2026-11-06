// src/components/cart/CartTable.tsx
import { useI18n } from "../../features/I18nProvider";
import { CartDetail } from "../CartDetail";
import type { CartLineView } from "../../features/useCart";
import { formatCurrency } from "../../utils/formatCurrency";

type Props = {
  lines: CartLineView[];
};

export function CartTable({ lines }: Props) {
  const { t } = useI18n();

  const total = lines.reduce((sum, l) => sum + l.subtotal, 0);

  return (
    <table className="w-full text-gray-900">
      <thead className="border-b border-gray-200">
        <tr>
          <th className="text-left py-2">{t("product")}</th>
          <th className="text-left py-2 text-right">{t("price")}</th>
          <th className="text-left py-2 text-right">{t("qty")}</th>
          <th className="text-left py-2 text-right">{t("subtotal")}</th>
          { <th className="text-left py-2"></th> }
        </tr>
      </thead>

      <tbody>
        {lines.map((p) => (
          <CartDetail key={p.id} product={p} />
        ))}
      </tbody>

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
  );
}
