export const siteConfig = {
  name: "LUNEO",
  tagline: "Votre regard, votre signature.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2250707070707",
  phoneDisplay: "+225 07 07 07 07 07",
  currency: "FCFA",
  shippingCost: 2000,
  freeShippingThreshold: 50000,
  startingPrice: 12000,
  store: {
    city: "Daloa",
    district: "Quartier Commerce",
    street: "Avenue de l'Indépendance",
    landmark: "à côté de la Pharmacie Centrale",
    mapUrl:
      "https://maps.google.com/?q=Avenue+de+l'Ind%C3%A9pendance+Quartier+Commerce+Daloa",
  },
} as const;
