import { siteConfig } from "./config";

export function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat("fr-FR").format(amount);
  return `${formatted} ${siteConfig.currency}`;
}
