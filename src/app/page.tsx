import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BestSellers } from "@/components/home/BestSellers";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { BrandsSection } from "@/components/home/BrandsSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { AccessoriesTeaser } from "@/components/home/AccessoriesTeaser";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import {
  getCategories,
  getFeaturedProducts,
  getBrands,
  getProducts,
} from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [categories, featuredProducts, brands, accessories] = await Promise.all([
    getCategories(),
    getFeaturedProducts(5),
    getBrands(),
    getProducts({ categorySlug: "accessoires" }),
  ]);

  return (
    <>
      <Hero />
      <CategoryGrid categories={categories} />
      <BestSellers products={featuredProducts} />
      <ServicesTeaser />
      <PromoBanner />
      <AccessoriesTeaser products={accessories.slice(0, 4)} />
      <BrandsSection brands={brands} />
      <AboutTeaser />
    </>
  );
}
