import { siteConfig } from "@/lib/config";

/** LUNE + a red ring for the O, as on the posters. */
export function Logo({
  tone = "dark",
  ring = "red",
  withTagline = false,
  className = "",
}: {
  tone?: "dark" | "light";
  /** Use "white" when the logo sits on a red background */
  ring?: "red" | "white";
  withTagline?: boolean;
  className?: string;
}) {
  const ink = tone === "dark" ? "text-luneo-black" : "text-white";
  const ringColor = ring === "red" ? "border-luneo-red" : "border-white";

  return (
    <span className={`inline-flex flex-col items-start ${className}`}>
      <span className={`inline-flex items-center font-display text-[1.6em] font-black leading-none tracking-tight ${ink}`}>
        LUNE
        <span
          aria-hidden="true"
          className={`ml-[0.04em] inline-block h-[0.72em] w-[0.72em] rounded-full border-[0.14em] ${ringColor}`}
        />
        <span className="sr-only">O</span>
      </span>
      {withTagline && (
        <span className={`mt-1 text-[0.42em] font-semibold uppercase tracking-[0.2em] ${ink}`}>
          {siteConfig.tagline}
        </span>
      )}
    </span>
  );
}
