// src/app/ProductGrid.tsx
import { ProductCard } from "../components/ProductCard";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  return (
    <main className="pt-20 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
