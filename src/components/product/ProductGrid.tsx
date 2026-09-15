import { ProductCard } from "./ProductCard";
import type { ProductCardData } from "@/lib/types";

export function ProductGrid({
  products,
  emptyMessage = "Aucun produit ne correspond à votre recherche.",
}: {
  products: ProductCardData[];
  emptyMessage?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-luneo-gray-border bg-luneo-gray py-16 text-center">
        <p className="text-sm text-black/60">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
