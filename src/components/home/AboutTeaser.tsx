import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/config";

export function AboutTeaser() {
  return (
    <section className="py-16">
      <div className="container-luneo grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-bold uppercase italic tracking-wide text-luneo-red">
            LUNEO {siteConfig.store.city}
          </p>
          <h2 className="font-poster mt-3 text-4xl text-luneo-black sm:text-5xl">
            Plus qu&apos;une
            <br />
            <span className="torn-highlight mt-1">boutique</span>
          </h2>
          <p className="mt-5 max-w-lg text-black/70">
            Nous croyons que chacun mérite une vision claire et un style qui
            lui ressemble. LUNEO, c&apos;est une sélection de montures
            modernes, des verres de qualité et un accompagnement
            personnalisé, au cœur de {siteConfig.store.city}.
          </p>
          <div className="mt-8">
            <Button href="/a-propos" variant="outline">
              Notre histoire →
            </Button>
          </div>
        </div>

        <div className="collage-frame relative aspect-[4/3] w-full rotate-1 overflow-hidden rounded-2xl bg-luneo-black">
          <Image
            src={images.framesDisplay}
            alt="Présentoir de montures LUNEO"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
