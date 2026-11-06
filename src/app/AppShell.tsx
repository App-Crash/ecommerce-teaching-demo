// src/app/AppShell.tsx
import { I18nProvider } from "../features/I18nProvider";
import { Navbar } from "../components/Navbar";

type Props = {
  onCartClick: () => void;
  children: React.ReactNode;
};

export function AppShell({ onCartClick, children }: Props) {
  return (
    <I18nProvider>
      <Navbar onCartClick={onCartClick} />
      {children}
    </I18nProvider>
  );
}
