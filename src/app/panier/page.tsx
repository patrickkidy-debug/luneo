"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { formatPrice } from "@/lib/format";
import { computeShippingCost } from "@/lib/shipping";
import { buildCartWhatsAppLink } from "@/lib/whatsapp";

export default function CartPage() {
  const { items, subtotal } = useCart();
  const shipping = computeShippingCost(subtotal);
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-luneo flex flex-col items-center gap-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-luneo-black">Votre panier est vide</h1>
        <p className="max-w-md text-sm text-black/60">
          Parcourez notre collection et ajoutez vos montures préférées à votre panier.
        </p>
        <Button href="/lunettes-de-vue">Continuer mes achats</Button>
      </div>
    );
  }

  const whatsappLink = buildCartWhatsAppLink(
    items.map((item) => ({
      name: item.name,
      reference: item.reference,
      price: item.price,
      quantity: item.quantity,
    })),
    total
  );

  return (
    <div className="container-luneo py-10">
      <h1 className="text-2xl font-bold text-luneo-black sm:text-3xl">
        Mon panier ({items.length})
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-luneo-gray-border bg-white p-5">
          {items.map((item) => (
            <CartLineItem key={item.productId} item={item} />
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-luneo-gray-border bg-luneo-gray p-6">
          <h2 className="text-base font-bold text-luneo-black">Résumé</h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between text-black/70">
              <span>Sous-total</span>
              <Price price={subtotal} size="sm" />
            </div>
            <div className="flex justify-between text-black/70">
              <span>Livraison</span>
              <span>{shipping === 0 ? "Offerte" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-luneo-gray-border pt-3 text-base font-bold text-luneo-black">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button href="/commande" size="lg">
              Passer la commande
            </Button>
            <Button href={whatsappLink} target="_blank" rel="noreferrer" variant="secondary">
              Commander sur WhatsApp
            </Button>
            <Link
              href="/lunettes-de-vue"
              className="text-center text-sm font-medium text-luneo-black/70 hover:text-luneo-red"
            >
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
