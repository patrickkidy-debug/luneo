export function Badge({
  children,
  tone = "red",
}: {
  children: React.ReactNode;
  tone?: "red" | "black" | "gray";
}) {
  const toneClasses = {
    red: "bg-luneo-red text-white",
    black: "bg-luneo-black text-white",
    gray: "bg-luneo-gray text-luneo-black border border-luneo-gray-border",
  }[tone];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${toneClasses}`}
    >
      {children}
    </span>
  );
}
