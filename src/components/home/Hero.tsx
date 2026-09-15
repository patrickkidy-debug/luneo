import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { images } from "@/lib/images";

const advantages = [
  { icon: "💳", title: "À partir de", value: "20 000 FCFA" },
  { icon: "⚡", title: "Montage en", value: "20 minutes" },
  { icon: "🛡️", title: "Garantie", value: "6 mois" },
];

export function Hero() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="container-luneo grid grid-cols-1 items-center gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div className="order-2 lg:order-1">
          <h1 className="text-4xl font-extrabold leading-tight text-luneo-black sm:text-5xl lg:text-6xl">
            Plus qu&apos;une paire
            <br />
            de lunettes,
            <br />
            <span className="text-luneo-red">un style de vie.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base text-black/60 sm:text-lg">
            Chez LUNEO, nous croyons que chaque regard raconte une histoire.
            Découvrez notre sélection de montures modernes, élégantes et
            confortables.
          </p>

          <div className="mt-8">
            <Button href="/lunettes-de-vue" size="lg" className="w-full sm:w-auto">
              Découvrir la collection →
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-luneo-gray-border pt-6">
            {advantages.map((item) => (
              <div key={item.title} className="flex flex-col items-start gap-1">
                <span className="text-lg text-luneo-red">{item.icon}</span>
                <p className="text-xs text-black/50">{item.title}</p>
                <p className="text-sm font-semibold text-luneo-black">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 flex items-center justify-center gap-4 lg:order-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-luneo-gray">
            <Image
              src={images.heroLifestyle}
              alt="Femme portant des lunettes LUNEO"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="hidden shrink-0 flex-col gap-1 text-right text-2xl font-extrabold leading-tight text-luneo-red lg:flex">
            <span>Voir</span>
            <span>Mieux</span>
            <span>Vivre</span>
            <span>Plus.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
