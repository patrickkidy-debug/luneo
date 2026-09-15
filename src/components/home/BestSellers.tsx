import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import type { ProductCardData } from "@/lib/types";

export function BestSellers({ products }: { products: ProductCardData[] }) {
  return (
    <section className="bg-luneo-gray py-16">
      <div className="container-luneo">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionTitle eyebrow="Sélection" title="Nos meilleures ventes" />
          <Button href="/lunettes-de-vue" variant="outline">
            Voir tout le catalogue →
          </Button>
        </div>

        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
