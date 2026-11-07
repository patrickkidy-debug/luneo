import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function TopBar() {
  const { store } = siteConfig;

  return (
    <div className="hidden bg-luneo-red text-white md:block">
      <div className="container-luneo flex items-center justify-between py-2 text-xs font-semibold">
        <a href={store.mapUrl} target="_blank" rel="noreferrer" className="hover:underline">
          📍 En magasin à {store.city} · {store.district}, {store.street}
        </a>
        <p>✓ Produits 100% authentiques</p>
        <div className="flex items-center gap-4">
          <a href={`tel:${siteConfig.phoneDisplay.replace(/\s/g, "")}`} className="hover:underline">
            ☎ {siteConfig.phoneDisplay}
          </a>
          <Link href="/boutiques" className="hover:underline">
            Nous trouver →
          </Link>
        </div>
      </div>
    </div>
  );
}
