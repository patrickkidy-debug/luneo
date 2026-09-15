import { siteConfig } from "./config";

export function computeShippingCost(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= siteConfig.freeShippingThreshold ? 0 : siteConfig.shippingCost;
}
