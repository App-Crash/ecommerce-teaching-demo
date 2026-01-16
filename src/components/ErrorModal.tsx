import { createPortal } from "react-dom";
import { useI18n } from "../features/I18nProvider";

type Props = {
  errorRef: string;
  onClose: () => void;
};

export function ErrorModal({ errorRef, onClose }: Props) {
  const { t } = useI18n();

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-gray-800 p-6 rounded-xl max-w-md w-full shadow-xl">
        <h2 className="text-xl font-semibold text-red-600">
          {t("error_title")}
        </h2>

        <p className="mt-3 text-gray-700">
          {t("error_generic_message")}
        </p>

        <p className="mt-3 text-sm text-gray-500">
          {t("error_reference")}{" "}
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
            {errorRef}
          </span>
        </p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
