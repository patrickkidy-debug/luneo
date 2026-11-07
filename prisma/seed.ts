import { PrismaClient } from "@prisma/client";
import { images as IMG } from "../src/lib/images";

const prisma = new PrismaClient();

async function main() {
  console.log("Nettoyage...");
  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.address.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.store.deleteMany();
  await prisma.service.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();

  console.log("Catégories...");
  const [catVue, catSoleil, catVerres, catAccessoires] = await Promise.all([
    prisma.category.create({
      data: {
        name: "Lunettes de vue",
        slug: "lunettes-de-vue",
        description: "Des montures pensées pour votre quotidien.",
        image: IMG.categoryVue,
        position: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: "Lunettes de soleil",
        slug: "lunettes-de-soleil",
        description: "Style et protection pour toutes vos journées.",
        image: IMG.categorySoleil,
        position: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: "Verres correcteurs",
        slug: "verres",
        description: "Des verres de haute précision, adaptés à votre vue.",
        image: IMG.categoryVerres,
        position: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: "Accessoires",
        slug: "accessoires",
        description: "Étuis, chiffons et essentiels pour vos lunettes.",
        image: IMG.categoryAccessoires,
        position: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: "Nos services",
        slug: "services",
        description: "Examens de vue, montage et ajustement par des experts.",
        image: IMG.categoryServices,
        position: 5,
      },
    }),
  ]);

  console.log("Marques...");
  const brandData = [
    { name: "LUNEO", slug: "luneo" },
    { name: "Ray-Ban", slug: "ray-ban" },
    { name: "Tommy Hilfiger", slug: "tommy-hilfiger" },
    { name: "Lacoste", slug: "lacoste" },
    { name: "Vogue", slug: "vogue" },
    { name: "Carrera", slug: "carrera" },
    { name: "Polaroid", slug: "polaroid" },
    { name: "ZEISS", slug: "zeiss" },
    { name: "Essilor", slug: "essilor" },
  ];
  const brands = Object.fromEntries(
    await Promise.all(
      brandData.map(async (b) => [b.slug, await prisma.brand.create({ data: b })])
    )
  );

  console.log("Produits...");
  const products = [
    {
      name: "LUNEO Classic",
      slug: "luneo-classic",
      reference: "LC001",
      description:
        "Une monture intemporelle en acétate, pensée pour un usage quotidien. Confortable, légère et résistante, elle s'adapte à toutes les morphologies de visage.",
      price: 45000,
      compareAtPrice: null,
      stock: 24,
      gender: "UNISEXE" as const,
      type: "VUE" as const,
      shape: "RONDE" as const,
      color: "Noir mat",
      brandSlug: "luneo",
      categoryId: catVue.id,
      featured: true,
      image: IMG.frameRoundBlack,
    },
    {
      name: "LUNEO Vision",
      slug: "luneo-vision",
      reference: "LV002",
      description:
        "Monture ultra-légère en titane pour un confort optimal toute la journée. Design minimaliste et moderne.",
      price: 38000,
      compareAtPrice: 42000,
      stock: 18,
      gender: "FEMME" as const,
      type: "VUE" as const,
      shape: "OVALE" as const,
      color: "Doré",
      brandSlug: "luneo",
      categoryId: catVue.id,
      featured: true,
      image: IMG.frameRoundClear,
    },
    {
      name: "LUNEO Urban",
      slug: "luneo-urban",
      reference: "LU003",
      description:
        "Monture carrée au style urbain affirmé. Parfaite pour un look contemporain et assuré.",
      price: 42000,
      compareAtPrice: null,
      stock: 15,
      gender: "HOMME" as const,
      type: "VUE" as const,
      shape: "CARREE" as const,
      color: "Havane",
      brandSlug: "luneo",
      categoryId: catVue.id,
      featured: false,
      image: IMG.frameSquareDark,
    },
    {
      name: "LUNEO Prestige",
      slug: "luneo-prestige",
      reference: "LP004",
      description:
        "Notre monture haut de gamme, finitions soignées et matériaux premium pour une élégance discrète.",
      price: 55000,
      compareAtPrice: null,
      stock: 10,
      gender: "UNISEXE" as const,
      type: "VUE" as const,
      shape: "RECTANGULAIRE" as const,
      color: "Noir brillant",
      brandSlug: "luneo",
      categoryId: catVue.id,
      featured: true,
      image: IMG.framePremium,
    },
    {
      name: "LUNEO Solar",
      slug: "luneo-solar",
      reference: "LS005",
      description:
        "Lunettes de soleil polarisées, protection UV400, pour un été sans compromis sur le style.",
      price: 45000,
      compareAtPrice: null,
      stock: 20,
      gender: "UNISEXE" as const,
      type: "SOLAIRE" as const,
      shape: "AVIATEUR" as const,
      color: "Noir",
      brandSlug: "luneo",
      categoryId: catSoleil.id,
      featured: true,
      image: IMG.sunglassesSport,
    },
    {
      name: "Ray-Ban RB2140",
      slug: "ray-ban-rb2140",
      reference: "RB2140",
      description:
        "L'iconique Wayfarer Ray-Ban. Un classique indémodable pour un style affirmé en toute saison.",
      price: 85000,
      compareAtPrice: 95000,
      stock: 12,
      gender: "UNISEXE" as const,
      type: "SOLAIRE" as const,
      shape: "CARREE" as const,
      color: "Noir",
      brandSlug: "ray-ban",
      categoryId: catSoleil.id,
      featured: true,
      image: IMG.sunglassesFlatlay,
    },
    {
      name: "Tommy Hilfiger TH1938",
      slug: "tommy-hilfiger-th1938",
      reference: "TH1938",
      description:
        "Monture au design sportswear signée Tommy Hilfiger, pour un style casual chic.",
      price: 75000,
      compareAtPrice: null,
      stock: 9,
      gender: "HOMME" as const,
      type: "VUE" as const,
      shape: "RECTANGULAIRE" as const,
      color: "Bleu marine",
      brandSlug: "tommy-hilfiger",
      categoryId: catVue.id,
      featured: false,
      image: IMG.frameClearRound,
    },
    {
      name: "Vogue VO5428",
      slug: "vogue-vo5428",
      reference: "VO5428",
      description:
        "Monture papillon élégante et féminine signée Vogue Eyewear, pour un style glamour.",
      price: 65000,
      compareAtPrice: null,
      stock: 14,
      gender: "FEMME" as const,
      type: "VUE" as const,
      shape: "PAPILLON" as const,
      color: "Écaille",
      brandSlug: "vogue",
      categoryId: catVue.id,
      featured: true,
      image: IMG.frameCatEye,
    },
    {
      name: "Carrera Champion",
      slug: "carrera-champion",
      reference: "CC006",
      description:
        "Lunettes de soleil sportives Carrera, verres miroir et monture robuste pour l'extérieur.",
      price: 70000,
      compareAtPrice: null,
      stock: 11,
      gender: "HOMME" as const,
      type: "SOLAIRE" as const,
      shape: "AVIATEUR" as const,
      color: "Argenté",
      brandSlug: "carrera",
      categoryId: catSoleil.id,
      featured: false,
      image: IMG.sunglassesWhite,
    },
    {
      name: "Polaroid PLD 6108",
      slug: "polaroid-pld-6108",
      reference: "PLD6108",
      description:
        "Verres polarisés Polaroid, réduction efficace des reflets pour une vision claire au soleil.",
      price: 48000,
      compareAtPrice: 55000,
      stock: 16,
      gender: "UNISEXE" as const,
      type: "SOLAIRE" as const,
      shape: "RONDE" as const,
      color: "Marron",
      brandSlug: "polaroid",
      categoryId: catSoleil.id,
      featured: false,
      image: IMG.sunglassesColorful,
    },
  ];

  for (const p of products) {
    const { brandSlug, image, ...data } = p;
    await prisma.product.create({
      data: {
        ...data,
        brandId: brands[brandSlug].id,
        images: {
          create: [{ url: image, alt: p.name, position: 0 }],
        },
        variants: {
          create: [{ color: p.color ?? "Standard", sku: `${p.reference}-STD`, stock: p.stock }],
        },
      },
    });
  }

  console.log("Verres...");
  const lenses = [
    {
      name: "Verre ZEISS ClearView",
      slug: "verre-zeiss-clearview",
      reference: "ZE-CV01",
      description:
        "Verre correcteur haute définition ZEISS avec traitement anti-reflets et anti-rayures.",
      price: 25000,
      brandSlug: "zeiss",
    },
    {
      name: "Verre Essilor Varilux",
      slug: "verre-essilor-varilux",
      reference: "ES-VX02",
      description:
        "Verre progressif Essilor Varilux, transition fluide entre vision de près et de loin.",
      price: 35000,
      brandSlug: "essilor",
    },
  ];
  for (const l of lenses) {
    await prisma.product.create({
      data: {
        name: l.name,
        slug: l.slug,
        reference: l.reference,
        description: l.description,
        price: l.price,
        stock: 30,
        gender: "UNISEXE",
        type: "VUE",
        brandId: brands[l.brandSlug].id,
        categoryId: catVerres.id,
        featured: false,
        images: { create: [{ url: IMG.lensCare, alt: l.name, position: 0 }] },
      },
    });
  }

  console.log("Accessoires...");
  const accessories = [
    { name: "Étui rigide LUNEO", reference: "ACC-ETUI", price: 5000, image: IMG.glassesCase },
    { name: "Chiffon microfibre LUNEO", reference: "ACC-CHIFFON", price: 2000, image: IMG.glassesFlatlay },
    { name: "Cordon de lunettes LUNEO", reference: "ACC-CORDON", price: 3000, image: IMG.glassesFlatlay },
    { name: "Spray nettoyant LUNEO", reference: "ACC-SPRAY", price: 4000, image: IMG.cleaningCloth },
  ];
  for (const [i, a] of accessories.entries()) {
    await prisma.product.create({
      data: {
        name: a.name,
        slug: a.reference.toLowerCase(),
        reference: a.reference,
        description: `${a.name}, un essentiel pour prendre soin de vos lunettes au quotidien.`,
        price: a.price,
        stock: 50,
        gender: "UNISEXE",
        type: "VUE",
        brandId: brands["luneo"].id,
        categoryId: catAccessoires.id,
        featured: i === 0,
        images: { create: [{ url: a.image, alt: a.name, position: 0 }] },
      },
    });
  }

  console.log("Services...");
  const services = [
    {
      title: "Examen de vue",
      slug: "examen-de-vue",
      description: "Un bilan visuel complet réalisé par nos opticiens qualifiés.",
      image: IMG.eyeExam,
    },
    {
      title: "Montage de lunettes",
      slug: "montage-de-lunettes",
      description: "Montage professionnel et rapide de vos verres sur la monture choisie.",
      image: IMG.serviceFitting,
    },
    {
      title: "Ajustement",
      slug: "ajustement",
      description: "Ajustement gratuit de vos lunettes pour un confort parfait.",
      image: IMG.serviceAdjust,
    },
    {
      title: "Réparation",
      slug: "reparation",
      description: "Réparation de vos montures abîmées par nos techniciens.",
      image: IMG.serviceFitting,
    },
    {
      title: "Conseils personnalisés",
      slug: "conseils-personnalises",
      description: "Un accompagnement sur-mesure pour choisir la monture qui vous ressemble.",
      image: IMG.serviceAdvice,
    },
    {
      title: "Lentilles",
      slug: "lentilles",
      description: "Adaptation et vente de lentilles de contact journalières ou mensuelles.",
      image: IMG.lensCare,
    },
    {
      title: "Service après-vente",
      slug: "service-apres-vente",
      description: "Un accompagnement continu après votre achat, pour votre tranquillité.",
      image: IMG.storeInterior,
    },
  ];
  for (const [i, s] of services.entries()) {
    await prisma.service.create({ data: { ...s, position: i } });
  }

  console.log("Boutiques...");
  await prisma.store.createMany({
    data: [
      {
        name: "LUNEO Daloa",
        slug: "luneo-daloa",
        address: "Avenue de l'Indépendance, Quartier Commerce (à côté de la Pharmacie Centrale)",
        city: "Daloa",
        phone: "+225 07 07 07 07 07",
        hours: "Lun-Sam 9h-19h",
        mapUrl: "https://maps.google.com/?q=Avenue+de+l'Ind%C3%A9pendance+Quartier+Commerce+Daloa",
      },
    ],
  });

  console.log("Terminé.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
