const icons = {
  glasses: (
    <>
      <circle cx="7" cy="14" r="3.5" />
      <circle cx="17" cy="14" r="3.5" />
      <path d="M10.5 14h3M3.5 14 2 9m18.5 5L22 9" />
    </>
  ),
  lens: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M8.5 9.5a4.5 4.5 0 0 1 4-2" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  advice: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
    </>
  ),
  feather: (
    <>
      <path d="M20 4C11 4 6 10 6 18" />
      <path d="M20 4c0 8-5 12-11 12M4 20l3-3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
} as const;

export type FeatureIcon = keyof typeof icons;

export const storeFeatures: { icon: FeatureIcon; label: string }[] = [
  { icon: "glasses", label: "Montures tendance" },
  { icon: "lens", label: "Verres optiques" },
  { icon: "eye", label: "Contrôle de la vue" },
  { icon: "advice", label: "Conseil personnalisé" },
];

/** Round red icon badges with italic labels, split by thin red rules. */
export function FeatureBadges({
  items = storeFeatures,
  className = "",
}: {
  items?: { icon: FeatureIcon; label: string }[];
  className?: string;
}) {
  return (
    <ul className={`grid grid-cols-2 gap-y-6 sm:flex sm:divide-x-2 sm:divide-luneo-red ${className}`}>
      {items.map((item) => (
        <li key={item.label} className="flex flex-col items-center gap-2 px-3 text-center sm:px-5">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-luneo-red shadow-[0_4px_0_rgb(0_0_0/0.15)]">
            <svg
              aria-hidden="true"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {icons[item.icon]}
            </svg>
          </span>
          <span className="max-w-[8rem] text-sm font-bold italic leading-tight text-luneo-black">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
