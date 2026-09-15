import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function TopBar() {
  return (
    <div className="hidden bg-luneo-black text-white md:block">
      <div className="container-luneo flex items-center justify-between py-2 text-xs">
        <p>🚚 Livraison rapide à Abidjan et dans toute la Côte d&apos;Ivoire</p>
        <p>✓ Produits 100% authentiques</p>
        <div className="flex items-center gap-4">
          <a href={`tel:${siteConfig.phoneDisplay.replace(/\s/g, "")}`} className="hover:text-luneo-red">
            ☎ Besoin d&apos;aide ? {siteConfig.phoneDisplay}
          </a>
          <Link href="/boutiques" className="hover:text-luneo-red">
            📍 Nos boutiques
          </Link>
        </div>
      </div>
    </div>
  );
}
