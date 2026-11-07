export function SectionTitle({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  /** Words shown after the title on a torn red strip */
  highlight?: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase italic tracking-wide text-luneo-red">
          {eyebrow}
        </p>
      )}
      <h2 className="font-poster text-4xl text-luneo-black sm:text-5xl">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="torn-highlight">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-black/70 ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
