import type { Metadata } from "next";
import { getStores } from "@/lib/data";
import { StoreCard } from "@/components/store/StoreCard";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Nos boutiques",
  description: "Retrouvez les boutiques LUNEO à Abidjan : adresses, horaires et contacts.",
};

export const revalidate = 60;

export default async function StoresPage() {
  const stores = await getStores();

  const jsonLd = stores.map((store) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: store.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: store.address,
      addressLocality: store.city,
      addressCountry: "CI",
    },
    telephone: store.phone,
    url: siteConfig.url,
  }));

  return (
    <div className="container-luneo py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-2xl font-bold text-luneo-black sm:text-3xl">Nos boutiques</h1>
      <p className="mt-2 max-w-xl text-sm text-black/60">
        Retrouvez-nous à Abidjan pour un accompagnement personnalisé et un essayage en boutique.
      </p>

      {stores.length === 0 ? (
        <p className="mt-8 text-sm text-black/50">Aucune boutique disponible pour le moment.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </div>
  );
}
