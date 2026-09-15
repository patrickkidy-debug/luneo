"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { formatPrice } from "@/lib/format";
import type { CartLine } from "@/lib/types";

export function CartLineItem({ item }: { item: CartLine }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-luneo-gray-border py-5 last:border-none">
      <Link
        href={`/produit/${item.slug}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-luneo-gray"
      >
        {item.image && (
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/produit/${item.slug}`} className="text-sm font-semibold text-luneo-black hover:text-luneo-red">
              {item.name}
            </Link>
            <p className="mt-1 text-xs text-black/40">Réf. {item.reference}</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.productId)}
            aria-label={`Supprimer ${item.name} du panier`}
            className="text-xs font-medium text-black/40 hover:text-luneo-red"
          >
            Supprimer
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(quantity) => updateQuantity(item.productId, quantity)}
          />
          <p className="text-sm font-bold text-luneo-black">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
