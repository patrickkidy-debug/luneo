import { siteConfig } from "@/lib/config";
import { TornEdge } from "./TornEdge";

const { store } = siteConfig;

/** Red torn band: "En magasin à Daloa" with the address and the prescription note. */
export function StoreBand() {
  return (
    <section aria-label={`Notre boutique à ${store.city}`} className="text-luneo-red">
      <TornEdge seed={11} />
      <div className="bg-luneo-red text-white">
        <div className="container-luneo flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <a href={store.mapUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-4">
            <svg aria-hidden="true" width="52" height="52" viewBox="0 0 24 24" fill="#fff" className="shrink-0">
              <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            <span>
              <span className="block text-lg font-bold italic">En magasin à</span>
              <span className="font-poster block text-5xl sm:text-6xl">{store.city}</span>
              <span className="mt-1 block text-sm text-white/90 group-hover:underline">
                {store.district}, {store.street} ({store.landmark})
              </span>
            </span>
          </a>

          <p className="flex items-center gap-4 md:border-l-2 md:border-white/60 md:pl-6">
            <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" />
              <path d="M14 3v5h5M8 9h3M8 13h5M8 17h3" />
              <circle cx="18" cy="18" r="3.5" />
              <path d="M18 16.5v3M16.5 18h3" />
            </svg>
            <span className="max-w-[16rem] text-base font-bold italic leading-snug">
              Nos verres nécessitent une prescription médicale.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
