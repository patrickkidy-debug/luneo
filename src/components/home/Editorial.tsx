import Image from "next/image";
import Link from "next/link";
import type { Category } from "@prisma/client";
import { SectionTitle } from "@/components/ui/SectionTitle";

const EDITORIAL = [
  { slug: "lunettes-de-vue", tags: "Montures · Verres correcteurs · Montage rapide", tilt: "-rotate-1" },
  { slug: "lunettes-de-soleil", tags: "Protection UV · Style · Confort", tilt: "rotate-1" },
];

export function Editorial({ categories }: { categories: Category[] }) {
  const items = EDITORIAL.flatMap(({ slug, ...rest }) => {
    const category = categories.find((c) => c.slug === slug);
    return category ? [{ category, ...rest }] : [];
  });

  return (
    <section className="py-16">
      <div className="container-luneo">
        <SectionTitle eyebrow="Éditorial" title="Trouvez votre" highlight="style" align="center" />

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
          {items.map(({ category, tags, tilt }) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className={`collage-frame group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-luneo-black sm:aspect-[5/4] ${tilt}`}
            >
              {category.image && (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <p className="text-xs font-semibold italic text-white/85">{tags}</p>
                <h3 className="font-poster mt-2 text-4xl sm:text-5xl">{category.name}</h3>
                <span className="mt-4 inline-block rounded-full bg-luneo-red px-4 py-1.5 text-sm font-bold italic">
                  Découvrir →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
