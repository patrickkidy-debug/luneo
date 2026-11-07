import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BurstLines } from "@/components/brand/BurstLines";

const campaigns = [
  {
    src: "/images/campagnes/aicha-12000.webp",
    alt: "Affiche LUNEO : monture rouge à 12 000 FCFA en magasin à Daloa",
    width: 1100,
    height: 1100,
    tilt: "-rotate-2",
  },
  {
    src: "/images/campagnes/style-ados.webp",
    alt: "Affiche LUNEO : le style aussi pour les ados, à partir de 12 000 FCFA",
    width: 1100,
    height: 1204,
    tilt: "rotate-2",
  },
];

export function Campaigns() {
  return (
    <section className="bg-luneo-paper-deep/60 py-16">
      <div className="container-luneo">
        <SectionTitle
          eyebrow="En ce moment"
          title="Les offres"
          highlight="en magasin"
          description="Nos campagnes du moment, à découvrir et essayer directement en boutique."
          align="center"
        />

        <div className="relative mx-auto mt-14 grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <BurstLines className="absolute -top-10 right-0 hidden h-20 w-20 rotate-90 md:block" />
          {campaigns.map((campaign) => (
            <div key={campaign.src} className={`collage-frame overflow-hidden rounded-xl bg-white ${campaign.tilt}`}>
              <Image
                src={campaign.src}
                alt={campaign.alt}
                width={campaign.width}
                height={campaign.height}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
