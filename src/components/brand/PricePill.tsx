import { formatPrice } from "@/lib/format";

/** "À partir de 12 000 FCFA" capsule, flanked by red rules. */
export function PricePill({
  amount,
  label = "À partir de",
  className = "",
}: {
  amount: number;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span aria-hidden="true" className="h-[3px] w-10 rounded bg-luneo-red sm:w-16" />
      <p className="flex flex-col items-center rounded-full border-[3px] border-luneo-red bg-white px-7 py-2 leading-none shadow-[0_6px_0_rgb(0_0_0/0.08)]">
        <span className="text-xs font-extrabold uppercase tracking-wide text-luneo-black">{label}</span>
        <span className="font-poster mt-1 text-3xl text-luneo-red sm:text-4xl">{formatPrice(amount)}</span>
      </p>
      <span aria-hidden="true" className="h-[3px] w-10 rounded bg-luneo-red sm:w-16" />
    </div>
  );
}
