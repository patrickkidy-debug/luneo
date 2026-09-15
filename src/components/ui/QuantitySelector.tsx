"use client";

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-luneo-gray-border">
      <button
        type="button"
        aria-label="Diminuer la quantité"
        className="flex h-10 w-10 items-center justify-center text-lg text-luneo-black transition-colors hover:text-luneo-red disabled:opacity-30"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Augmenter la quantité"
        className="flex h-10 w-10 items-center justify-center text-lg text-luneo-black transition-colors hover:text-luneo-red disabled:opacity-30"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
      >
        +
      </button>
    </div>
  );
}
