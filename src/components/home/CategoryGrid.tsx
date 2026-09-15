import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Category } from "@prisma/client";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-white py-16">
      <div className="container-luneo">
        <SectionTitle
          eyebrow="Collections"
          title="Découvrez nos collections"
          description="Cinq univers pensés pour répondre à tous vos besoins en optique."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-luneo-gray-border bg-luneo-gray transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="text-base font-bold text-luneo-black">{category.name}</h3>
                {category.description && (
                  <p className="text-sm text-black/60">{category.description}</p>
                )}
                <span className="mt-auto pt-2 text-sm font-semibold text-luneo-red">
                  Voir la collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
