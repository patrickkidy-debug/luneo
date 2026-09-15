import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SearchBar } from "@/components/layout/SearchBar";

export const metadata: Metadata = {
  title: "Recherche",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const products = q ? await getProducts({ q }) : [];

  return (
    <div className="container-luneo py-10">
      <h1 className="text-2xl font-bold text-luneo-black sm:text-3xl">Recherche</h1>

      <div className="mt-6 max-w-lg">
        <SearchBar />
      </div>

      {q && (
        <p className="mt-6 text-sm text-black/50">
          {products.length} résultat{products.length > 1 ? "s" : ""} pour « {q} »
        </p>
      )}

      <div className="mt-8">
        {q ? (
          <ProductGrid
            products={products}
            emptyMessage={`Aucun produit ne correspond à « ${q} ».`}
          />
        ) : (
          <p className="text-sm text-black/50">
            Saisissez un nom de produit, une référence ou une marque pour commencer.
          </p>
        )}
      </div>
    </div>
  );
}
