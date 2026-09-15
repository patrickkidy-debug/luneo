import type { Metadata } from "next";
import {
  CategoryPageContent,
  type CategorySearchParams,
} from "@/components/category/CategoryPageContent";

export const metadata: Metadata = {
  title: "Lunettes de vue en Côte d'Ivoire",
  description:
    "Découvrez notre collection de lunettes de vue : montures modernes, élégantes et confortables pour homme, femme et unisexe.",
};

export default async function LunettesDeVuePage({
  searchParams,
}: {
  searchParams: Promise<CategorySearchParams>;
}) {
  return (
    <CategoryPageContent
      categorySlug="lunettes-de-vue"
      title="Lunettes de vue"
      description="Des montures pensées pour votre quotidien."
      searchParams={await searchParams}
    />
  );
}
