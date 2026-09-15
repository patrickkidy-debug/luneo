import type { Metadata } from "next";
import {
  CategoryPageContent,
  type CategorySearchParams,
} from "@/components/category/CategoryPageContent";

export const metadata: Metadata = {
  title: "Lunettes de soleil",
  description:
    "Lunettes de soleil pour homme et femme en Côte d'Ivoire : style et protection pour toutes vos journées.",
};

export default async function LunettesDeSoleilPage({
  searchParams,
}: {
  searchParams: Promise<CategorySearchParams>;
}) {
  return (
    <CategoryPageContent
      categorySlug="lunettes-de-soleil"
      title="Lunettes de soleil"
      description="Style et protection pour toutes vos journées."
      searchParams={await searchParams}
    />
  );
}
