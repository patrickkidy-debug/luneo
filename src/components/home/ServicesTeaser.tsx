import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { BurstLines } from "@/components/brand/BurstLines";
import { FeatureBadges } from "@/components/brand/FeatureBadges";
import { images } from "@/lib/images";

export function ServicesTeaser() {
  return (
    <section className="py-16">
      <div className="container-luneo grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <BurstLines className="absolute -right-4 -top-8 z-10 h-16 w-16 rotate-45" />
          <div className="collage-frame relative aspect-[4/3] w-full -rotate-1 overflow-hidden rounded-2xl bg-luneo-black">
            <Image
              src={images.eyeExam}
              alt="Opticien réalisant un examen de vue"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold uppercase italic tracking-wide text-luneo-red">
            Nos services
          </p>
          <h2 className="font-poster text-4xl text-luneo-black sm:text-5xl">
            Prenez soin de
            <br />
            <span className="torn-highlight mt-1">vos yeux</span>
          </h2>
          <p className="mt-5 max-w-lg text-black/70">
            Nos opticiens qualifiés vous accueillent dans un espace moderne et
            équipé : examen de la vue, conseils, montage rapide et ajustement.
          </p>

          <FeatureBadges className="mt-8" />

          <div className="mt-10">
            <Button href="/services" size="lg">Réserver un examen →</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
