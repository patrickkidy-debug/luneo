import { prisma } from "./prisma";
import type { Prisma, Gender, ProductType, ProductShape } from "@prisma/client";
import type { ProductCardData, ProductDetailData } from "./types";

const cardInclude = {
  brand: true,
  images: { orderBy: { position: "asc" as const }, take: 1 },
} satisfies Prisma.ProductInclude;

type ProductWithCardRelations = Prisma.ProductGetPayload<{ include: typeof cardInclude }>;

function toCardData(product: ProductWithCardRelations): ProductCardData {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    reference: product.reference,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    brandName: product.brand.name,
    image: product.images[0]?.url ?? "",
    imageAlt: product.images[0]?.alt ?? product.name,
  };
}

export async function getFeaturedProducts(limit = 5): Promise<ProductCardData[]> {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE", featured: true },
    include: cardInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return products.map(toCardData);
}

export type ProductFilters = {
  categorySlug?: string;
  gender?: string;
  type?: string;
  shape?: string;
  brandSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: "pertinence" | "nouveautes" | "prix-asc" | "prix-desc" | "meilleures-ventes";
  q?: string;
};

export async function getProducts(filters: ProductFilters = {}): Promise<ProductCardData[]> {
  const where: Prisma.ProductWhereInput = { status: "ACTIVE" };

  if (filters.categorySlug) where.category = { slug: filters.categorySlug };
  if (filters.gender) where.gender = filters.gender as Gender;
  if (filters.type) where.type = filters.type as ProductType;
  if (filters.shape) where.shape = filters.shape as ProductShape;
  if (filters.brandSlug) where.brand = { slug: filters.brandSlug };
  if (filters.minPrice || filters.maxPrice) {
    where.price = {
      ...(filters.minPrice ? { gte: filters.minPrice } : {}),
      ...(filters.maxPrice ? { lte: filters.maxPrice } : {}),
    };
  }
  if (filters.inStock) where.stock = { gt: 0 };
  if (filters.q) {
    where.OR = [
      { name: { contains: filters.q } },
      { reference: { contains: filters.q } },
      { brand: { name: { contains: filters.q } } },
      { category: { name: { contains: filters.q } } },
    ];
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    filters.sort === "prix-asc"
      ? { price: "asc" }
      : filters.sort === "prix-desc"
        ? { price: "desc" }
        : filters.sort === "nouveautes"
          ? { createdAt: "desc" }
          : filters.sort === "meilleures-ventes"
            ? { featured: "desc" }
            : { featured: "desc" };

  const products = await prisma.product.findMany({ where, include: cardInclude, orderBy });
  return products.map(toCardData);
}

export async function getProductBySlug(slug: string): Promise<ProductDetailData | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      brand: true,
      category: true,
      images: { orderBy: { position: "asc" } },
      variants: true,
    },
  });
  if (!product) return null;

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    reference: product.reference,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    brandName: product.brand.name,
    image: product.images[0]?.url ?? "",
    imageAlt: product.images[0]?.alt ?? product.name,
    description: product.description,
    stock: product.stock,
    gender: product.gender,
    type: product.type,
    color: product.color,
    images: product.images.map((img) => ({ url: img.url, alt: img.alt ?? product.name })),
    variants: product.variants.map((v) => ({ id: v.id, color: v.color, stock: v.stock })),
    categorySlug: product.category.slug,
    categoryName: product.category.name,
  };
}

export async function getRelatedProducts(
  categorySlug: string,
  excludeSlug: string,
  limit = 4
): Promise<ProductCardData[]> {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE", category: { slug: categorySlug }, slug: { not: excludeSlug } },
    include: cardInclude,
    take: limit,
  });
  return products.map(toCardData);
}

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { position: "asc" } });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function getBrands() {
  return prisma.brand.findMany({ orderBy: { name: "asc" } });
}

export async function getServices() {
  return prisma.service.findMany({ orderBy: { position: "asc" } });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({ where: { slug } });
}

export async function getStores() {
  return prisma.store.findMany({ orderBy: { name: "asc" } });
}

export async function getProductsByIds(ids: string[]): Promise<ProductCardData[]> {
  if (ids.length === 0) return [];
  const products = await prisma.product.findMany({
    where: { id: { in: ids } },
    include: cardInclude,
  });
  return products.map(toCardData);
}
