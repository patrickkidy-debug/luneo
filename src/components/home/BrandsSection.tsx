import type { Brand } from "@prisma/client";
import { TornEdge } from "@/components/brand/TornEdge";

export function BrandsSection({ brands }: { brands: Brand[] }) {
  return (
    <section aria-label="Nos marques" className="text-luneo-black">
      <TornEdge seed={3} />
      <ul className="flex items-center gap-10 overflow-x-auto bg-luneo-black px-6 py-4 [scrollbar-width:none] lg:justify-center lg:gap-14">
        {brands.map((brand) => (
          <li key={brand.id} className="font-poster shrink-0 text-2xl text-white/85">
            {brand.name}
          </li>
        ))}
      </ul>
      <TornEdge seed={5} flip />
    </section>
  );
}
