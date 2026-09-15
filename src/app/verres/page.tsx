import type { Metadata } from "next";
import {
  CategoryPageContent,
  type CategorySearchParams,
} from "@/components/category/CategoryPageContent";

export const metadata: Metadata = {
  title: "Verres correcteurs",
  description:
    "Des verres correcteurs de haute précision, adaptés à votre vue, signés ZEISS et Essilor.",
};

export default async function VerresPage({
  searchParams,
}: {
  searchParams: Promise<CategorySearchParams>;
}) {
  return (
    <CategoryPageContent
      categorySlug="verres"
      title="Verres correcteurs"
      description="Des verres de haute précision, adaptés à votre vue."
      searchParams={await searchParams}
    />
  );
}
