import { formatPrice } from "@/lib/format";

export function Price({
  price,
  compareAtPrice,
  size = "md",
}: {
  price: number;
  compareAtPrice?: number | null;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  }[size];

  return (
    <span className="inline-flex items-baseline gap-2">
      <span className={`font-extrabold italic text-luneo-red ${sizeClasses}`}>
        {formatPrice(price)}
      </span>
      {compareAtPrice && compareAtPrice > price && (
        <span className="text-sm text-black/40 line-through">
          {formatPrice(compareAtPrice)}
        </span>
      )}
    </span>
  );
}
