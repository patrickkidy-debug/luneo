import type { Metadata } from "next";

export const metadata: Metadata = { title: "Conditions générales" };

export default function ConditionsPage() {
  return (
    <div className="container-luneo max-w-3xl py-10">
      <h1 className="text-2xl font-bold text-luneo-black sm:text-3xl">
        Conditions générales de vente
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-black/70">
        <p>
          Les présentes conditions régissent les ventes de produits effectuées sur le
          site LUNEO auprès de clients situés en Côte d&apos;Ivoire.
        </p>
        <p>
          Les prix sont indiqués en Francs CFA (FCFA), toutes taxes comprises. LUNEO
          se réserve le droit de modifier ses prix à tout moment, les produits étant
          facturés sur la base des tarifs en vigueur au moment de la commande.
        </p>
        <p>
          Le paiement peut s&apos;effectuer par Mobile Money, carte bancaire ou à la
          livraison, selon les modalités disponibles pour votre zone.
        </p>
        <p>
          Toute commande implique l&apos;acceptation pleine et entière des présentes
          conditions générales de vente.
        </p>
      </div>
    </div>
  );
}
