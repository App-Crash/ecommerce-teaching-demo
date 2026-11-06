import { useState } from 'react';
import { useCart } from "../features/useCart";
import { LanguageSwitch } from "./LanguageSwitch";
import { useI18n } from "../features/I18nProvider";
import { useDebouncedCallback } from "../features/useDebouncedCallback";

type NavbarProps = {
  onCartClick: () => void;
};

export function Navbar({ onCartClick }: NavbarProps) {
  const { lineCount } = useCart();
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const validateDebouncedSearch = useDebouncedCallback(
    (val: string) => {
      const valTrimmed = val.trim();
      if (valTrimmed.length < 3 || /[^a-zA-Z0-9]/.test(valTrimmed)) {
        console.log("Invalid search string: ", valTrimmed);
      } else {
        console.log("Searching products for: ", valTrimmed);
      }
    }, 500);


  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gray-950 text-white flex items-center justify-between px-6 z-50 shadow-md">
      <h1 onMouseOver={onCartClick} onMouseOut={onCartClick} className="text-xl font-semibold tracking-wide">{t("store_title")}</h1>
      <div className="flex items-center gap-4">
        {/* Username component with debounce hook */}
        <h3>Product Search:</h3>
        <input 
        value = {query}
        onChange = {(e) => {
          const newVal = e.target.value;
          setQuery(newVal);
          validateDebouncedSearch(newVal);
        }}
       />
        {/* End Username component with debounce hook */}

        <LanguageSwitch />

        <button
          onClick={onCartClick}
          className="px-3 py-2 relative text-2xl hover:scale-110 transition-transform"
        >
          🛒
          {lineCount > 0 && (
            <span className="absolute -bottom-0 -right-2 
              bg-green-700 text-white text-xs font-semibold 
              rounded-full px-1 py-1 min-w-[1.5rem] min-h-[1.0rem] text-center">
              {lineCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
