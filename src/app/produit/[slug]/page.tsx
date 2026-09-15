import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/config";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductDetailActions } from "@/components/product/ProductDetailActions";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produit introuvable" };

  return {
    title: `${product.name} | ${product.brandName}`,
    description: product.description.slice(0, 155),
    openGraph: {
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.categorySlug, product.slug, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.reference,
    brand: { "@type": "Brand", name: product.brandName },
    image: product.images.map((i) => i.url),
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/produit/${product.slug}`,
      priceCurrency: "XOF",
      price: product.price,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="container-luneo py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} productName={product.name} />

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-black/50">
            {product.brandName}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-luneo-black">{product.name}</h1>
          <p className="mt-1 text-sm text-black/40">Réf. {product.reference}</p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-luneo-black">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-base text-black/40 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <div className="mt-3">
            {product.stock > 0 ? (
              <Badge tone="black">En stock</Badge>
            ) : (
              <Badge tone="gray">Rupture de stock</Badge>
            )}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-black/70">{product.description}</p>

          <div className="mt-8">
            <ProductDetailActions product={product} />
          </div>

          <ul className="mt-8 space-y-2 border-t border-luneo-gray-border pt-6 text-sm text-black/60">
            <li>✓ Produit authentique</li>
            <li>✓ Livraison en Côte d&apos;Ivoire</li>
            <li>✓ Retours selon conditions</li>
            <li>✓ Assistance client</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <SectionTitle title="Vous aimerez aussi" />
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </div>
      )}
    </div>
  );
}
