export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  reference: string;
  price: number;
  compareAtPrice: number | null;
  brandName: string;
  image: string;
  imageAlt: string;
};

export type ProductDetailData = ProductCardData & {
  description: string;
  stock: number;
  gender: "HOMME" | "FEMME" | "UNISEXE";
  type: "VUE" | "SOLAIRE";
  color: string | null;
  images: { url: string; alt: string }[];
  variants: { id: string; color: string; stock: number }[];
  categorySlug: string;
  categoryName: string;
};

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  reference: string;
  price: number;
  image: string;
  quantity: number;
};
