"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TornEdge } from "@/components/brand/TornEdge";
import { BurstLines } from "@/components/brand/BurstLines";
import { Logo } from "@/components/brand/Logo";

type DesignItem = {
  id: string;
  category: "print" | "digital" | "packaging";
  title: string;
  format: string;
  dimensionsMm: string;
  resolution: string;
  paperType: string;
  description: string;
  svgFile: string;
  aspectRatio: string;
  tips: string[];
};

const ITEMS: DesignItem[] = [
  {
    id: "affiche",
    category: "print",
    title: "Affiche Grand Format d'Ouverture",
    format: "A3 / A2 / 4x3 (Abribus & Vitrine)",
    dimensionsMm: "420 x 594 mm (ou 297 x 420 mm en A3)",
    resolution: "300 DPI (CMJN)",
    paperType: "Papier couché demi-mat 170g ou 200g, impression quadri",
    description:
      "L'affiche phare d'inauguration conçue pour marquer les esprits dans Daloa. Idéale pour l'affichage de rue, la vitrine du magasin et les commerces partenaires.",
    svgFile: "/print/affiche-ouverture-luneo.svg",
    aspectRatio: "aspect-[800/1150]",
    tips: [
      "Prévoir 5 mm de fond perdu (bleed) tout autour pour la découpe.",
      "Demander à l'imprimeur un vernis sélectif ou brillant sur le logo et les lunettes pour un effet pop art saisissant.",
      "Idéal en collage urbain ou affichage vitrine rétro-éclairé.",
    ],
  },
  {
    id: "flyer-recto",
    category: "print",
    title: "Flyer Promotionnel d'Ouverture — Recto",
    format: "Format A5 (Distribution de rue & Boîte aux lettres)",
    dimensionsMm: "148 x 210 mm",
    resolution: "300 DPI (CMJN)",
    paperType: "Couché brillant ou satiné 135g à 250g",
    description:
      "Face d'impact avec l'accroche pop art, le visuel des mannequins, le prix d'appel à 12 000 FCFA et le coupon détachable avec réduction et bilan offert.",
    svgFile: "/print/flyer-recto-luneo.svg",
    aspectRatio: "aspect-[600/850]",
    tips: [
      "Le coupon inférieur possède une ligne de prédécoupe ou pointillés pour inciter le client à le ramener en magasin.",
      "Distribuer aux abords du grand marché et des lycées de Daloa.",
    ],
  },
  {
    id: "flyer-verso",
    category: "print",
    title: "Flyer Promotionnel d'Ouverture — Verso",
    format: "Format A5 (Verso explicatif & Plan d'accès)",
    dimensionsMm: "148 x 210 mm",
    resolution: "300 DPI (CMJN)",
    paperType: "Couché brillant ou satiné 135g à 250g",
    description:
      "4 engagements de réassurance (bilan offert, 150+ montures, verres certifiés, montage 48h) + Plan d'accès schématique clair repérant la boutique face à la Pharmacie Centrale à Daloa.",
    svgFile: "/print/flyer-verso-luneo.svg",
    aspectRatio: "aspect-[600/850]",
    tips: [
      "La carte d'accès est simplifiée pour permettre aux habitants et visiteurs de repérer l'emplacement immédiatement.",
      "Le QR Code et contact WhatsApp direct permettent une prise de RDV instantanée.",
    ],
  },
  {
    id: "carte-visite-recto",
    category: "print",
    title: "Carte de Visite Professionnelle — Recto",
    format: "Standard Carte de Visite",
    dimensionsMm: "85 x 55 mm",
    resolution: "300 DPI (CMJN)",
    paperType: "Cartonné 350g couché mat avec pelliculage Soft Touch",
    description:
      "Carte officielle de présentation avec identité pop art épurée, logo LUNEO distinctif, coordonnées directes, quartier commerce à Daloa et contact direct.",
    svgFile: "/print/carte-visite-recto-luneo.svg",
    aspectRatio: "aspect-[500/320]",
    tips: [
      "Choisir un pelliculage soft touch (toucher peau de pêche) pour un rendu haut de gamme.",
      "Les coins peuvent être laissés droits ou légèrement arrondis (3 mm).",
    ],
  },
  {
    id: "carte-visite-verso",
    category: "print",
    title: "Carte de Correction & Rendez-vous — Verso",
    format: "Standard Carte de Visite (Fiche Ordonnance)",
    dimensionsMm: "85 x 55 mm",
    resolution: "300 DPI (CMJN)",
    paperType: "Cartonné 350g non couché ou couché mat inscriptible au stylo",
    description:
      "Fiche mémo essentielle pour l'opticien : tableau de mesures optiques (OD/OG : sphère, cylindre, axe, EP), date de délivrance et prochain contrôle de la vue.",
    svgFile: "/print/carte-visite-verso-luneo.svg",
    aspectRatio: "aspect-[500/320]",
    tips: [
      "IMPORTANT : Le verso ne doit PAS être pelliculé brillant afin de pouvoir écrire dessus facilement au stylo à bille !",
      "Le QR code redirige vers le WhatsApp du magasin pour renouveler ou commander.",
    ],
  },
  {
    id: "kakemono",
    category: "print",
    title: "Kakémono Roll-Up Vertical (Totem trottoir & vitrine)",
    format: "Roll-Up Vertical Sur Pied",
    dimensionsMm: "850 x 2000 mm",
    resolution: "150 à 300 DPI à taille réelle",
    paperType: "Bâche PVC 450g anti-reflet et anti-curling ou toile polyester",
    description:
      "Totem d'entrée géant visible à 25 mètres sur l'Avenue de l'Indépendance. Il signale l'ouverture, affiche l'offre 12 000 FCFA et invite les passants à entrer.",
    svgFile: "/print/kakemono-roll-up-luneo.svg",
    aspectRatio: "aspect-[600/1410]",
    tips: [
      "Prévoir une marge de 50 mm en bas pour l'enrouleur mécanique.",
      "Placer à l'entrée de la boutique sur le trottoir pendant les heures d'ouverture.",
    ],
  },
  {
    id: "post-social",
    category: "digital",
    title: "Post Carré Réseaux Sociaux (Instagram / Facebook / WhatsApp)",
    format: "Carré 1:1 Digital",
    dimensionsMm: "1080 x 1080 pixels (72-96 DPI RVB)",
    resolution: "RVB Digital",
    paperType: "Format web / Réseaux sociaux",
    description:
      "Visuel promotionnel optimisé pour les campagnes sponsorisées Facebook Ads à Daloa et les partages sur WhatsApp et Instagram.",
    svgFile: "/print/post-social-1080.svg",
    aspectRatio: "aspect-square",
    tips: [
      "Respecte la règle des 20% de texte de Facebook Ads pour une diffusion maximale sans pénalité d'enchère.",
      "Utiliser comme photo de profil ou publication épinglée lors de l'inauguration.",
    ],
  },
  {
    id: "story-social",
    category: "digital",
    title: "Story Plein Écran (TikTok / Instagram / WhatsApp Status)",
    format: "Vertical 9:16 Digital",
    dimensionsMm: "1080 x 1920 pixels",
    resolution: "RVB Digital",
    paperType: "Format mobile vertical",
    description:
      "Visuel plein écran pour les statuts WhatsApp (très populaires en Côte d'Ivoire) et les stories Instagram & TikTok avec call-to-action d'ouverture.",
    svgFile: "/print/story-social-1920.svg",
    aspectRatio: "aspect-[1080/1920]",
    tips: [
      "Garder les zones haute (150px) et basse (250px) sans éléments vitaux pour éviter le masquage par l'interface des stories.",
      "Poster sur le statut WhatsApp de la boutique dès 7h30 le matin de l'ouverture.",
    ],
  },
  {
    id: "sticker",
    category: "packaging",
    title: "Sticker Macaron Rond Packaging & Sacs",
    format: "Macaron Rond Découpé (Sticker)",
    dimensionsMm: "Diamètre 80 mm",
    resolution: "300 DPI (CMJN)",
    paperType: "Adhésif vinyle brillant ou papier autocollant kraft",
    description:
      "Sceau de garantie pop art 'Édition Ouverture' à coller sur les étuis à lunettes, les sacs en papier kraft et les boîtes d'expédition.",
    svgFile: "/print/sticker-packaging-luneo.svg",
    aspectRatio: "aspect-square",
    tips: [
      "Fourni avec découpe mi-chair (kiss-cut) pour un décollage rapide par les équipes en boutique.",
      "Transforme n'importe quel sac neutre en sac de marque personnalisé à faible coût.",
    ],
  },
];

export default function KitOuverturePage() {
  const [selectedId, setSelectedId] = useState<string>("affiche");
  const [filter, setFilter] = useState<"all" | "print" | "digital" | "packaging">("all");

  const currentItem = ITEMS.find((i) => i.id === selectedId) ?? ITEMS[0];
  const filteredItems = filter === "all" ? ITEMS : ITEMS.filter((i) => i.category === filter);

  return (
    <div className="min-h-screen bg-luneo-paper py-10">
      <div className="container-luneo">
        {/* Breadcrumb / Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-luneo-black/10 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-luneo-black hover:text-luneo-red"
          >
            ← Retour à l&apos;accueil
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-luneo-red px-3 py-1 text-xs font-black text-white">
              KIT GRAPHIQUE OFFICIEL
            </span>
            <span className="text-xs font-semibold uppercase text-luneo-black/70">
              Ouverture Daloa 2026
            </span>
          </div>
        </div>

        {/* Header Hero */}
        <div className="relative mt-8 rounded-3xl bg-white p-8 shadow-[8px_8px_0_var(--color-luneo-red)] sm:p-12">
          <BurstLines className="absolute -right-4 -top-6 h-20 w-20 rotate-12" />
          <div className="max-w-3xl">
            <span className="text-sm font-black uppercase tracking-widest text-luneo-red">
              Studio Graphique &amp; Impression
            </span>
            <h1 className="font-poster mt-3 text-4xl text-luneo-black sm:text-6xl">
              Les Éléments Graphiques
              <br />
              <span className="torn-highlight mt-2 whitespace-nowrap">d&apos;Ouverture LUNEO</span>
            </h1>
            <p className="mt-6 text-base font-medium text-luneo-black/80 sm:text-lg">
              Tous les supports de communication essentiels pour le grand lancement de LUNEO à Daloa
              dans le style Pop Art / Collage rétro-moderne : affiches grand format, flyers
              recto-verso, cartes de visite &amp; ordonnance, kakémono roll-up, bannières réseaux
              sociaux et macarons packaging.
            </p>

            {/* Print Specs Summary Pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-black/15 bg-luneo-paper px-4 py-1.5 text-xs font-bold text-luneo-black">
                🎨 Palette CMJN : Rouge #E30613, Noir #0A0A0A, Papier #F3E6D2
              </span>
              <span className="rounded-full border border-black/15 bg-luneo-paper px-4 py-1.5 text-xs font-bold text-luneo-black">
                📐 Fichiers Vectoriels SVG Haute Définition (300 DPI)
              </span>
              <span className="rounded-full border border-black/15 bg-luneo-paper px-4 py-1.5 text-xs font-bold text-luneo-black">
                📍 Daloa : Av. de l&apos;Indépendance, Quartier Commerce
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {(
            [
              { id: "all", label: "Tous les supports (9)" },
              { id: "print", label: "Print & Impression papier (6)" },
              { id: "digital", label: "Réseaux Sociaux & Digital (2)" },
              { id: "packaging", label: "Packaging & Stickers (1)" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                filter === tab.id
                  ? "bg-luneo-black text-white shadow-[4px_4px_0_var(--color-luneo-red)]"
                  : "bg-white text-luneo-black hover:bg-white/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Interactive Studio Grid */}
        <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Thumbnails Sidebar / Selector */}
          <div className="space-y-3 lg:col-span-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-luneo-black/60">
              Sélectionnez un support ({filteredItems.length})
            </h2>
            <div className="space-y-3">
              {filteredItems.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all ${
                      isSelected
                        ? "border-2 border-luneo-red bg-white shadow-[6px_6px_0_var(--color-luneo-red)]"
                        : "border border-black/10 bg-white/70 hover:bg-white"
                    }`}
                  >
                    {/* Mini SVG Preview */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-luneo-paper">
                      <Image
                        src={item.svgFile}
                        alt={item.title}
                        fill
                        className="object-contain p-1"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black text-luneo-black">{item.title}</p>
                      <p className="mt-0.5 text-xs text-luneo-red font-bold">{item.format}</p>
                      <p className="mt-1 text-[11px] text-luneo-black/60 truncate">
                        {item.dimensionsMm}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Visualizer & Production Details */}
          <div className="space-y-8 lg:col-span-8">
            {/* Visualizer Frame */}
            <div className="collage-frame relative overflow-hidden rounded-2xl bg-white p-6 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-5">
                <div>
                  <span className="text-xs font-black uppercase text-luneo-red">
                    {currentItem.category.toUpperCase()}
                  </span>
                  <h3 className="font-poster text-2xl text-luneo-black sm:text-3xl">
                    {currentItem.title}
                  </h3>
                  <p className="text-xs font-medium text-luneo-black/70">
                    Dimensions : {currentItem.dimensionsMm} • {currentItem.resolution}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <a
                    href={currentItem.svgFile}
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-luneo-red px-5 py-2.5 text-xs font-bold text-white shadow-[3px_3px_0_#0a0a0a] transition-transform hover:-translate-y-0.5"
                  >
                    ⬇ Télécharger SVG
                  </a>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-luneo-paper px-4 py-2.5 text-xs font-bold text-luneo-black hover:bg-luneo-paper-deep"
                  >
                    🖨 Imprimer
                  </button>
                </div>
              </div>

              {/* Rendered Visual Container */}
              <div className="relative mt-8 flex items-center justify-center rounded-xl bg-luneo-paper/40 p-4 sm:p-8">
                <div className={`relative w-full max-w-xl shadow-2xl ${currentItem.aspectRatio}`}>
                  <Image
                    src={currentItem.svgFile}
                    alt={currentItem.title}
                    fill
                    className="rounded-lg object-contain"
                    unoptimized
                  />
                </div>
              </div>

              {/* Technical Print Spec Sheet */}
              <div className="mt-8 rounded-xl border border-black/10 bg-luneo-card p-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-luneo-red">
                  Fiche Technique d&apos;Impression (Pour l&apos;imprimeur)
                </h4>
                <div className="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
                  <div>
                    <span className="font-bold text-luneo-black">Format fini :</span>
                    <p className="text-black/70">{currentItem.dimensionsMm}</p>
                  </div>
                  <div>
                    <span className="font-bold text-luneo-black">Résolution &amp; Mode :</span>
                    <p className="text-black/70">{currentItem.resolution}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="font-bold text-luneo-black">Support / Papier recommandé :</span>
                    <p className="text-black/70">{currentItem.paperType}</p>
                  </div>
                </div>

                {/* Tips */}
                <div className="mt-5 border-t border-black/10 pt-4">
                  <span className="font-bold text-luneo-black text-xs">
                    Recommandations d&apos;exécution :
                  </span>
                  <ul className="mt-2 space-y-1.5 text-xs text-black/75">
                    {currentItem.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-luneo-red font-bold">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Print Package Full Overview (All items quick download) */}
            <div className="rounded-2xl border-2 border-black/10 bg-white p-6 sm:p-8">
              <h3 className="font-poster text-xl text-luneo-black">
                Téléchargement Express de Tous les Fichiers
              </h3>
              <p className="mt-1 text-xs text-black/70">
                Accédez directement aux fichiers vectoriels SVG prêts pour l&apos;imprimeur en un
                clic :
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.svgFile}
                    download
                    className="flex items-center justify-between rounded-xl border border-black/10 bg-luneo-paper/50 p-3 text-xs font-bold text-luneo-black hover:border-luneo-red hover:bg-white"
                  >
                    <span className="truncate pr-2">{item.title}</span>
                    <span className="text-luneo-red">⬇</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

