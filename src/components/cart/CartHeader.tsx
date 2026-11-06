// src/components/cart/CartHeader.tsx
import { useI18n } from "../../features/I18nProvider";

type Props = {
  onClose: () => void;
};

export function CartHeader({ onClose }: Props) {
  const { t } = useI18n();

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-3 py-1 rounded-md 
            bg-gray-900 text-white 
            hover:bg-gray-700"
        >
          {t("close")}
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gray-900">
        {t("cart_title")}
      </h2>
    </>
  );
}
