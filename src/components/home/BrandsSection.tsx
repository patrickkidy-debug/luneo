import Link from "next/link";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Brand } from "@prisma/client";

export function BrandsSection({ brands }: { brands: Brand[] }) {
  return (
    <section className="bg-white py-16">
      <div className="container-luneo">
        <SectionTitle title="Nos marques" align="center" />

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex h-20 items-center justify-center rounded-xl border border-luneo-gray-border bg-luneo-gray px-4 text-sm font-semibold text-luneo-black/70 transition-colors hover:text-luneo-red"
            >
              {brand.name}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/lunettes-de-vue" className="text-sm font-semibold text-luneo-red hover:underline">
            Voir toutes les marques →
          </Link>
        </div>
      </div>
    </section>
  );
}
