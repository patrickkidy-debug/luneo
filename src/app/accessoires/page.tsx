import type { Metadata } from "next";
import {
  CategoryPageContent,
  type CategorySearchParams,
} from "@/components/category/CategoryPageContent";

export const metadata: Metadata = {
  title: "Accessoires",
  description: "Étuis, chiffons et essentiels pour prendre soin de vos lunettes LUNEO.",
};

export default async function AccessoiresPage({
  searchParams,
}: {
  searchParams: Promise<CategorySearchParams>;
}) {
  return (
    <CategoryPageContent
      categorySlug="accessoires"
      title="Accessoires"
      description="Étuis, chiffons et essentiels pour vos lunettes."
      searchParams={await searchParams}
    />
  );
}
