import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { ProductCardData } from "@/lib/types";

export function BestSellers({ products }: { products: ProductCardData[] }) {
  return (
    <section className="py-16">
      <div className="container-luneo">
        <SectionTitle eyebrow="Sélection" title="Nos meilleures" highlight="ventes" align="center" />

        <div className="mt-12">
          <ProductGrid products={products} />
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/lunettes-de-vue"
            className="border-b-[3px] border-luneo-red pb-0.5 text-sm font-bold italic text-luneo-black transition-colors hover:text-luneo-red"
          >
            Voir tout le catalogue →
          </Link>
        </div>
      </div>
    </section>
  );
}
