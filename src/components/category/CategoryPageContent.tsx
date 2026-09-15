import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getBrands, getProducts, type ProductFilters as Filters } from "@/lib/data";

export type CategorySearchParams = {
  gender?: string;
  type?: string;
  shape?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
  sort?: string;
};

export async function CategoryPageContent({
  categorySlug,
  title,
  description,
  searchParams,
}: {
  categorySlug: string;
  title: string;
  description: string;
  searchParams: CategorySearchParams;
}) {
  const filters: Filters = {
    categorySlug,
    gender: searchParams.gender,
    type: searchParams.type,
    shape: searchParams.shape,
    brandSlug: searchParams.brand,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    inStock: searchParams.inStock === "1",
    sort: (searchParams.sort as Filters["sort"]) ?? "pertinence",
  };

  const [products, brands] = await Promise.all([getProducts(filters), getBrands()]);

  return (
    <div className="container-luneo py-10">
      <SectionTitle title={title} description={description} />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ProductFilters brands={brands} />
        </aside>

        <div>
          <p className="mb-4 text-sm text-black/50">
            {products.length} produit{products.length > 1 ? "s" : ""}
          </p>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
