import type { Metadata } from "next";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  {
    q: "Quels sont les délais de livraison ?",
    a: "24 à 72h à Daloa, 2 à 5 jours ouvrés dans le reste de la Côte d'Ivoire.",
  },
  {
    q: "Puis-je payer à la livraison ?",
    a: "Oui, le paiement à la livraison est disponible sur l'ensemble de nos zones de livraison.",
  },
  {
    q: "Comment ajuster mes lunettes après achat ?",
    a: "L'ajustement est gratuit dans toutes nos boutiques LUNEO, sur simple présentation de votre monture.",
  },
  {
    q: "Puis-je commander sans créer de compte ?",
    a: "Oui, la commande via le panier ou directement sur WhatsApp ne nécessite aucune création de compte.",
  },
  {
    q: "Comment suivre ma commande ?",
    a: "Rendez-vous sur la page « Suivi de commande » avec votre numéro de commande et votre téléphone ou email.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-luneo max-w-3xl py-10">
      <h1 className="text-2xl font-bold text-luneo-black sm:text-3xl">
        Foire aux questions
      </h1>
      <div className="mt-8 divide-y divide-luneo-gray-border rounded-2xl border border-luneo-gray-border bg-white">
        {faqs.map((item) => (
          <details key={item.q} className="group p-5">
            <summary className="cursor-pointer list-none text-sm font-semibold text-luneo-black">
              {item.q}
            </summary>
            <p className="mt-3 text-sm text-black/60">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
