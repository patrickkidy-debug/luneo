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
      className="group block overflow-hidden rounded-2xl border border-luneo-gray-border bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-luneo-gray">
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
      </div>

      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-black/50">
          {product.brandName}
        </p>
        <h3 className="mt-1 truncate text-sm font-semibold text-luneo-black">
          {product.name}
        </h3>
        <p className="mt-0.5 text-xs text-black/40">Réf. {product.reference}</p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-3 w-full rounded-full bg-luneo-black py-2.5 text-xs font-semibold text-white transition-colors hover:bg-luneo-red"
        >
          Ajouter au panier
        </button>
      </div>
    </Link>
  );
}
