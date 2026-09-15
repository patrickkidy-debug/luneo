import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/lunettes-de-vue",
    "/lunettes-de-soleil",
    "/verres",
    "/accessoires",
    "/services",
    "/a-propos",
    "/boutiques",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    select: { slug: true, updatedAt: true },
  });

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/produit/${product.slug}`,
    lastModified: product.updatedAt,
  }));

  return [...staticRoutes, ...productRoutes];
}
