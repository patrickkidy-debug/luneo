import { siteConfig } from "./config";
import { formatPrice } from "./format";

type ProductForWhatsApp = {
  name: string;
  reference: string;
  price: number;
};

export function buildProductWhatsAppLink(product: ProductForWhatsApp): string {
  const message = [
    "Bonjour LUNEO,",
    "",
    "Je souhaite commander :",
    "",
    product.name,
    `Référence : ${product.reference}`,
    `Prix : ${formatPrice(product.price)}`,
    "",
    "Merci de m'indiquer les disponibilités et les modalités de livraison.",
  ].join("\n");

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

type CartItemForWhatsApp = {
  name: string;
  reference: string;
  price: number;
  quantity: number;
};

export function buildCartWhatsAppLink(items: CartItemForWhatsApp[], total: number): string {
  const lines = [
    "Bonjour LUNEO,",
    "",
    "Je souhaite commander :",
    "",
    ...items.map(
      (item) =>
        `${item.name} (Réf. ${item.reference}) x${item.quantity} — ${formatPrice(item.price * item.quantity)}`
    ),
    "",
    `Total : ${formatPrice(total)}`,
    "",
    "Merci de m'indiquer les disponibilités et les modalités de livraison.",
  ];

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}
