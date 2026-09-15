import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function ConfidentialitePage() {
  return (
    <div className="container-luneo max-w-3xl py-10">
      <h1 className="text-2xl font-bold text-luneo-black sm:text-3xl">
        Politique de confidentialité
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-black/70">
        <p>
          LUNEO collecte uniquement les informations nécessaires au traitement de vos
          commandes : nom, téléphone, email et adresse de livraison.
        </p>
        <p>
          Ces informations ne sont jamais revendues à des tiers. Elles sont utilisées
          exclusivement pour la gestion de vos commandes, votre suivi client et,
          avec votre consentement, l&apos;envoi de notre newsletter.
        </p>
        <p>
          Vous pouvez à tout moment demander la suppression de vos données en nous
          contactant via WhatsApp ou par téléphone.
        </p>
      </div>
    </div>
  );
}
