import type { Metadata } from "next";

export const metadata: Metadata = { title: "Retours et remboursements" };

export default function RetoursPage() {
  return (
    <div className="container-luneo max-w-3xl py-10">
      <h1 className="text-2xl font-bold text-luneo-black sm:text-3xl">
        Retours et remboursements
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-black/70">
        <p>
          Vous disposez de 7 jours après réception de votre commande pour signaler
          tout défaut ou non-conformité, produit non porté et dans son emballage
          d&apos;origine.
        </p>
        <p>
          Pour initier un retour, contactez-nous via WhatsApp ou par téléphone en
          précisant votre numéro de commande. Nos équipes vous indiqueront la marche
          à suivre.
        </p>
        <p>
          Les verres correcteurs sur-mesure ne sont ni repris ni remboursés, sauf
          erreur de fabrication de notre part.
        </p>
      </div>
    </div>
  );
}
