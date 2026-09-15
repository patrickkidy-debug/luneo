"use client";

import { useEffect, useState } from "react";
import { useFavorites } from "@/context/FavoritesContext";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import type { ProductCardData } from "@/lib/types";

export default function FavoritesPage() {
  const { ids } = useFavorites();
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (ids.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- no favorites to fetch, clear list
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/products/by-ids?ids=${ids.join(",")}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setProducts(data.products ?? []);
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [ids]);

  return (
    <div className="container-luneo py-10">
      <h1 className="text-2xl font-bold text-luneo-black sm:text-3xl">Mes favoris</h1>

      {loading ? (
        <p className="mt-8 text-sm text-black/50">Chargement de vos favoris...</p>
      ) : products.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-6 rounded-2xl border border-dashed border-luneo-gray-border bg-luneo-gray py-16 text-center">
          <p className="text-sm text-black/60">
            Vous n&apos;avez pas encore ajouté de produit à vos favoris.
          </p>
          <Button href="/lunettes-de-vue">Découvrir la collection</Button>
        </div>
      ) : (
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      )}
    </div>
  );
}
