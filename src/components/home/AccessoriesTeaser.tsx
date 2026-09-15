import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { ProductCardData } from "@/lib/types";

export function AccessoriesTeaser({ products }: { products: ProductCardData[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="container-luneo">
        <SectionTitle eyebrow="Essentiels" title="Les essentiels LUNEO" />
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
