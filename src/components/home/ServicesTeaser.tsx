import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { images } from "@/lib/images";

const items = [
  "Examen de la vue",
  "Conseils personnalisés",
  "Montage rapide",
  "Ajustement gratuit",
  "Service après-vente",
];

export function ServicesTeaser() {
  return (
    <section className="bg-white py-16">
      <div className="container-luneo grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-luneo-gray">
          <Image
            src={images.eyeExam}
            alt="Opticien réalisant un examen de vue"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-luneo-black sm:text-4xl">
            Prenez soin de vos yeux avec nos opticiens qualifiés dans un
            espace moderne et équipé.
          </h2>

          <ul className="mt-6 space-y-3">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-black/70">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-luneo-red text-xs text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href="/services">Réserver un examen →</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
