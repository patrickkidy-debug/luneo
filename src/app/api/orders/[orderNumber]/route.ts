import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const { orderNumber } = await params;
  const { searchParams } = new URL(request.url);
  const contact = searchParams.get("contact")?.trim().toLowerCase();

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true, shipment: true, payment: true },
  });

  if (
    !order ||
    !contact ||
    (order.phone.replace(/\s/g, "") !== contact.replace(/\s/g, "") &&
      order.email?.toLowerCase() !== contact)
  ) {
    return NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
  }

  return NextResponse.json({
    orderNumber: order.orderNumber,
    status: order.shipment?.status ?? order.status,
    createdAt: order.createdAt,
    total: order.total,
    items: order.items.map((item) => ({
      name: item.name,
      reference: item.reference,
      quantity: item.quantity,
      price: item.price,
    })),
    paymentMethod: order.payment?.provider,
    paymentStatus: order.payment?.status,
  });
}
