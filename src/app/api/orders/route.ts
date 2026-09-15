import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { computeShippingCost } from "@/lib/shipping";

type OrderPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  quartier?: string;
  deliveryMode: string;
  paymentMethod: "MOBILE_MONEY" | "CARTE" | "LIVRAISON";
  items: { productId: string; quantity: number }[];
};

function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LUNEO-${stamp}${random}`;
}

export async function POST(request: Request) {
  let payload: OrderPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (
    !payload.firstName ||
    !payload.lastName ||
    !payload.phone ||
    !payload.address ||
    !payload.city ||
    !payload.items?.length
  ) {
    return NextResponse.json(
      { error: "Merci de compléter toutes les informations obligatoires." },
      { status: 400 }
    );
  }

  try {
    const order = await prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({
        where: { id: { in: payload.items.map((i) => i.productId) } },
      });

      const orderItemsData = payload.items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) throw new Error(`Produit introuvable : ${item.productId}`);
        if (product.stock < item.quantity) {
          throw new Error(`Stock insuffisant pour ${product.name}.`);
        }
        return {
          productId: product.id,
          name: product.name,
          reference: product.reference,
          price: product.price,
          quantity: item.quantity,
        };
      });

      for (const item of orderItemsData) {
        const updated = await tx.product.updateMany({
          where: { id: item.productId, stock: { gte: item.quantity } },
          data: { stock: { decrement: item.quantity } },
        });
        if (updated.count === 0) {
          throw new Error(`Stock insuffisant pour ${item.name}.`);
        }
      }

      const subtotal = orderItemsData.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const shippingCost = computeShippingCost(subtotal);
      const total = subtotal + shippingCost;

      const created = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          firstName: payload.firstName,
          lastName: payload.lastName,
          phone: payload.phone,
          email: payload.email,
          address: payload.address,
          city: payload.city,
          quartier: payload.quartier,
          deliveryMode: payload.deliveryMode,
          subtotal,
          shippingCost,
          total,
          items: { create: orderItemsData },
          payment: {
            create: {
              provider: payload.paymentMethod,
              status: "EN_ATTENTE",
              amount: total,
            },
          },
          shipment: { create: { status: "RECUE" } },
        },
        include: { items: true },
      });

      return created;
    });

    return NextResponse.json({
      orderNumber: order.orderNumber,
      total: order.total,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur lors de la commande.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
