import Link from "next/link";
import { mainNav } from "@/lib/nav";
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
  return (
    <footer className="border-t border-luneo-gray-border bg-luneo-gray">
      <div className="container-luneo grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="text-2xl font-extrabold tracking-tight text-luneo-black">
            LUNE<span className="text-luneo-red">O</span>
          </span>
          <p className="mt-4 text-sm text-black/60">
            Des lunettes de qualité pour une vie plus claire.
          </p>
          <p className="mt-2 text-sm text-black/60">
            LUNEO, votre partenaire vision en Côte d&apos;Ivoire.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-luneo-gray-border bg-white px-3 py-1.5 text-xs font-medium text-luneo-black hover:border-luneo-red hover:text-luneo-red"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-luneo-black">
            Liens utiles
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-black/70">
            <li>
              <Link href="/" className="hover:text-luneo-red">Accueil</Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-luneo-red">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/boutiques" className="hover:text-luneo-red">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-luneo-black">
            Aide
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-black/70">
            {helpLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-luneo-red">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-luneo-black">
            Newsletter
          </h3>
          <p className="mt-4 text-sm text-black/60">
            Recevez nos offres et nouveautés
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-luneo-gray-border py-5">
        <p className="container-luneo text-center text-xs text-black/50">
          © {new Date().getFullYear()} LUNEO. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
