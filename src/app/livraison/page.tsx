import type { Metadata } from "next";

export const metadata: Metadata = { title: "Livraison" };

export default function LivraisonPage() {
  return (
    <div className="container-luneo max-w-3xl py-10">
      <h1 className="text-2xl font-bold text-luneo-black sm:text-3xl">Livraison</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-black/70">
        <p>
          LUNEO livre à Daloa et dans les principales villes de Côte d&apos;Ivoire.
          Les délais moyens sont de 24 à 72h à Daloa et de 2 à 5 jours ouvrés à
          l&apos;intérieur du pays, selon la disponibilité du produit.
        </p>
        <p>
          Les frais de livraison sont calculés au moment du passage de commande et
          affichés avant validation. La livraison est offerte à partir de 50 000 FCFA
          d&apos;achat.
        </p>
        <p>
          Un retrait gratuit en boutique est également possible : sélectionnez
          « Retrait en boutique » lors du paiement.
        </p>
      </div>
    </div>
  );
}
