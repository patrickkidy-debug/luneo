import type { Metadata } from "next";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "À propos",
  description: "L'histoire de LUNEO, enseigne d'optique moderne en Côte d'Ivoire.",
};

const values = [
  {
    title: "Modernité",
    description: "Des collections actuelles, renouvelées régulièrement selon les tendances.",
  },
  {
    title: "Qualité",
    description: "Des matériaux durables et des verres de précision, signés par de grandes marques.",
  },
  {
    title: "Proximité",
    description: "Un accompagnement personnalisé, en boutique comme en ligne.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="container-luneo py-10 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-luneo-red">
              Notre histoire
            </p>
            <h1 className="mt-2 text-3xl font-bold text-luneo-black sm:text-4xl">
              LUNEO, votre regard, votre signature.
            </h1>
            <p className="mt-6 text-black/60">
              Née en Côte d&apos;Ivoire, LUNEO est une enseigne d&apos;optique moderne qui
              accompagne chaque client dans le choix d&apos;une monture qui lui ressemble. Nous
              croyons que voir clair, c&apos;est aussi affirmer son style.
            </p>
            <p className="mt-4 text-black/60">
              Nos boutiques réunissent des opticiens qualifiés, une sélection rigoureuse de
              montures et un service pensé pour votre confort, du premier examen de vue jusqu&apos;à
              l&apos;ajustement final.
            </p>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-luneo-gray">
            <Image
              src={images.storeInterior}
              alt="Boutique LUNEO"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-luneo-gray py-16">
        <div className="container-luneo">
          <SectionTitle title="Nos valeurs" align="center" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl bg-white p-6 text-center">
                <h3 className="text-base font-bold text-luneo-black">{value.title}</h3>
                <p className="mt-2 text-sm text-black/60">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
