import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { images } from "@/lib/images";

export function AboutTeaser() {
  return (
    <section className="bg-luneo-gray py-16">
      <div className="container-luneo grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-luneo-red">
            LUNEO
          </p>
          <h2 className="mt-2 text-3xl font-bold text-luneo-black sm:text-4xl">
            Plus qu&apos;une boutique
          </h2>
          <p className="mt-4 max-w-lg text-black/60">
            Nous croyons que chacun mérite une vision claire et un style qui
            lui ressemble. LUNEO, c&apos;est une sélection de montures
            modernes, des verres de qualité et un accompagnement
            personnalisé.
          </p>
          <div className="mt-8">
            <Button href="/a-propos" variant="outline">
              Notre histoire →
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-white">
          <Image
            src={images.storeInterior}
            alt="Intérieur d'une boutique LUNEO"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
