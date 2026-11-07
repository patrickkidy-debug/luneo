"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { Price } from "@/components/ui/Price";
import type { ProductCardData } from "@/lib/types";

export function ProductCard({ product }: { product: ProductCardData }) {
  const { addItem } = useCart();
  const { isFavorite, toggle } = useFavorites();
  const favorite = isFavorite(product.id);

  function handleAddToCart(event: React.MouseEvent) {
    event.preventDefault();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      reference: product.reference,
      price: product.price,
      image: product.image,
    });
  }

  function handleToggleFavorite(event: React.MouseEvent) {
    event.preventDefault();
    toggle(product.id);
  }

  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group block rounded-2xl bg-luneo-card p-2.5 shadow-[0_2px_0_rgb(0_0_0/0.06)] transition-shadow hover:shadow-[6px_6px_0_var(--color-luneo-red)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}

        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          aria-pressed={favorite}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-luneo-black shadow-sm transition-colors hover:text-luneo-red"
        >
          {favorite ? "♥" : "♡"}
        </button>

        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <span className="absolute left-3 top-3 rounded-full bg-luneo-red px-2.5 py-1 text-[11px] font-semibold uppercase text-white">
            Promo
          </span>
        )}

        {/* Revealed on hover where hovering exists; always shown on touch screens */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute inset-x-3 bottom-3 rounded-full bg-luneo-black py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-luneo-red [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:focus-visible:translate-y-0 [@media(hover:hover)]:focus-visible:opacity-100"
        >
          Ajouter au panier
        </button>
      </div>

      <div className="px-1.5 pb-1.5 pt-3">
        <p className="text-[11px] font-bold uppercase italic tracking-[0.15em] text-luneo-red">
          {product.brandName}
        </p>
        <h3 className="mt-1 truncate text-sm font-semibold uppercase tracking-wide text-luneo-black">
          {product.name}
        </h3>
        <div className="mt-1">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
        </div>
      </div>
    </Link>
  );
}
