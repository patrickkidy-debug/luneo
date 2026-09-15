import Image from "next/image";
import type { Service } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

export function ServiceCard({ service }: { service: Service }) {
  const whatsappLink = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Bonjour LUNEO,\n\nJe souhaite prendre rendez-vous pour : ${service.title}.\n\nMerci de m'indiquer les disponibilités.`
  )}`;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-luneo-gray-border bg-white">
      {service.image && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-luneo-gray">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-base font-bold text-luneo-black">{service.title}</h3>
        <p className="text-sm text-black/60">{service.description}</p>
        <div className="mt-auto pt-2">
          <Button href={whatsappLink} target="_blank" rel="noreferrer" size="sm">
            Réserver un rendez-vous →
          </Button>
        </div>
      </div>
    </div>
  );
}
