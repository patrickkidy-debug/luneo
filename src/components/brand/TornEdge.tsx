// A torn-paper edge: a jagged band filled with currentColor.
// Place it directly above a coloured section (or flip it below one).

function tornPath(seed: number) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const points: string[] = [];
  for (let x = 0; x <= 1000; x += 12 + rand() * 18) {
    points.push(`${x.toFixed(1)},${(8 + rand() * 22).toFixed(1)}`);
  }
  points.push("1000,14");
  return `M0,40 L0,18 L${points.join(" L")} L1000,40 Z`;
}

export function TornEdge({
  flip = false,
  seed = 7,
  className = "",
}: {
  flip?: boolean;
  seed?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 40"
      preserveAspectRatio="none"
      className={`block h-5 w-full sm:h-7 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path d={tornPath(seed)} fill="currentColor" />
    </svg>
  );
}
