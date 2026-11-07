import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BurstLines } from "@/components/brand/BurstLines";
import { FeatureBadges } from "@/components/brand/FeatureBadges";
import { PricePill } from "@/components/brand/PricePill";
import { siteConfig } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Red torn corner, as on the posters */}
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-20 hidden h-64 w-80 rotate-12 bg-luneo-red lg:block [clip-path:polygon(8%_0,100%_0,100%_100%,0_78%,6%_52%,2%_30%)]"
      />

      <div className="container-luneo relative grid grid-cols-1 items-center gap-12 py-10 lg:grid-cols-[1.1fr_1fr] lg:py-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-luneo-black">
            {siteConfig.tagline}
          </p>
          <span aria-hidden="true" className="mt-3 h-1 w-20 rounded bg-luneo-red" />

          <h1 className="font-poster mt-6 text-[2.75rem] text-luneo-black min-[400px]:text-5xl sm:text-7xl xl:text-8xl">
            Des lunettes
            <br />
            qui vous
            <br />
            <span className="torn-highlight mt-2 whitespace-nowrap">ressemblent&nbsp;!</span>
          </h1>

          <PricePill amount={siteConfig.startingPrice} className="mt-8" />

          <FeatureBadges className="mt-10 w-full max-w-xl" />

          <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/lunettes-de-vue" size="lg">
              Découvrir la collection →
            </Button>
            <Link
              href="/boutiques"
              className="inline-flex items-center justify-center rounded-full border-2 border-luneo-black px-7 py-4 text-base font-semibold text-luneo-black transition-colors hover:bg-luneo-black hover:text-white"
            >
              Venir en boutique
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <BurstLines className="absolute -left-8 top-10 z-10 h-16 w-16 -rotate-12 sm:-left-12 sm:h-20 sm:w-20" />
          <div className="collage-frame relative aspect-[4/5] rotate-2 overflow-hidden rounded-2xl bg-luneo-black">
            <Image
              src="/images/mannequin-orion.webp"
              alt="Femme portant une monture LUNEO en acétate fumé"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover object-[50%_25%]"
            />
          </div>
          <p className="absolute -bottom-5 left-6 -rotate-3 rounded-full bg-luneo-black px-5 py-2 text-sm font-bold italic text-white shadow-lg">
            Nouvelle collection <span className="text-luneo-red">●</span> en magasin
          </p>
        </div>
      </div>
    </section>
  );
}
