"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Button } from "@/components/ui/Button";
import { buildProductWhatsAppLink } from "@/lib/whatsapp";
import type { ProductDetailData } from "@/lib/types";

export function ProductDetailActions({ product }: { product: ProductDetailData }) {
  const { addItem } = useCart();
  const { isFavorite, toggle } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product.variants[0]?.color ?? product.color ?? ""
  );
  const [added, setAdded] = useState(false);

  const favorite = isFavorite(product.id);
  const outOfStock = product.stock <= 0;

  function handleAddToCart() {
    if (outOfStock) return;
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        reference: product.reference,
        price: product.price,
        image: product.image,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const whatsappLink = buildProductWhatsAppLink(product);

  return (
    <div className="flex flex-col gap-5">
      {product.variants.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-luneo-black">Couleur</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedColor(variant.color)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  selectedColor === variant.color
                    ? "border-luneo-red bg-luneo-red text-white"
                    : "border-luneo-gray-border text-luneo-black/70 hover:border-luneo-red hover:text-luneo-red"
                }`}
              >
                {variant.color}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-luneo-black">Quantité</h3>
        <div className="mt-2">
          <QuantitySelector quantity={quantity} onChange={setQuantity} max={product.stock || 1} />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={handleAddToCart}
          disabled={outOfStock}
          size="lg"
          className="flex-1"
        >
          {outOfStock ? "Rupture de stock" : added ? "✓ Ajouté au panier" : "Ajouter au panier"}
        </Button>
        <Button href={whatsappLink} target="_blank" rel="noreferrer" variant="secondary" size="lg" className="flex-1">
          Commander sur WhatsApp
        </Button>
      </div>

      <button
        type="button"
        onClick={() => toggle(product.id)}
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-luneo-black/70 hover:text-luneo-red"
      >
        <span>{favorite ? "♥" : "♡"}</span>
        {favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>
    </div>
  );
}
