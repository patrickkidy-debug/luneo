import Link from "next/link";
import { mainNav } from "@/lib/nav";
import { siteConfig } from "@/lib/config";
import { Logo } from "@/components/brand/Logo";
import { TornEdge } from "@/components/brand/TornEdge";
import { NewsletterForm } from "./NewsletterForm";

const helpLinks = [
  { label: "Suivre ma commande", href: "/suivi-commande" },
  { label: "Livraison", href: "/livraison" },
  { label: "Retours et remboursements", href: "/retours" },
  { label: "Conditions générales", href: "/conditions-generales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "FAQ", href: "/faq" },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export function Footer() {
  const { store } = siteConfig;

  return (
    <footer className="text-luneo-black">
      <TornEdge seed={29} />
      <div className="bg-luneo-black text-white">
      <div className="container-luneo grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="text-2xl">
            <Logo tone="light" withTagline />
          </span>
          <p className="mt-5 text-sm text-white/70">
            Votre opticien à {store.city} : montures tendance, verres optiques,
            contrôle de la vue et conseil personnalisé.
          </p>
          <a
            href={store.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block text-sm text-white/70 hover:text-white"
          >
            📍 {store.district}, {store.street}
            <br />({store.landmark}), {store.city}
          </a>
          <div className="mt-5 flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white hover:border-luneo-red hover:bg-luneo-red"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase italic tracking-wide text-luneo-red">
            Liens utiles
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <Link href="/" className="hover:text-white">Accueil</Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/boutiques" className="hover:text-white">Contact</Link>
            </li>
            <li>
              <Link href="/kit-ouverture" className="font-bold text-luneo-red hover:text-white">
                ★ Kit Graphique Ouverture
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase italic tracking-wide text-luneo-red">
            Aide
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {helpLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase italic tracking-wide text-luneo-red">
            Newsletter
          </h3>
          <p className="mt-4 text-sm text-white/70">
            Recevez nos offres et nouveautés
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-luneo text-center text-xs text-white/50">
          © {new Date().getFullYear()} LUNEO. Tous droits réservés.
        </p>
      </div>
      </div>
    </footer>
  );
}
