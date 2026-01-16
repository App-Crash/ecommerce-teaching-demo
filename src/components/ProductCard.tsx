import { useCart } from "../features/useCart";
import type { CartItem } from "../features/cartStore";
import { useI18n } from "../features/I18nProvider";

type ProductProps = {
  product: CartItem;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(value);

export function ProductCard({ product }: ProductProps) {
  const { addItem } = useCart();
  const { t } = useI18n();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <div className="aspect-[3/4] bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-gray-950 text-xl font-semibold">
          {product.name}
        </h3>

        <p className="text-gray-700 font-medium">
          {formatCurrency(product.price)}
        </p>

        <button
          onClick={() => addItem(product)}
          className="
            mt-2
            bg-gray-900 text-white
            rounded-xl
            px-4 py-2
            hover:bg-gray-200 hover:text-gray-900
            transition-colors
          "
        >
          {t("add_to_cart")}
        </button>
      </div>
    </div>
  );
}
