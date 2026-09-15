"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";

const steps = [
  { key: "RECUE", label: "Commande reçue" },
  { key: "CONFIRMEE", label: "Commande confirmée" },
  { key: "EN_PREPARATION", label: "En préparation" },
  { key: "EXPEDIEE", label: "Expédiée" },
  { key: "LIVREE", label: "Livrée" },
];

type OrderResult = {
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  items: { name: string; reference: string; quantity: number; price: number }[];
};

type Status = "idle" | "loading" | "success" | "error";

function OrderTrackingForm() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(searchParams.get("order") ?? "");
  const [contact, setContact] = useState(searchParams.get("phone") ?? "");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResult | null>(null);

  async function handleSubmit(event?: React.FormEvent) {
    event?.preventDefault();
    if (!orderNumber || !contact) return;
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch(
        `/api/orders/${encodeURIComponent(orderNumber)}?contact=${encodeURIComponent(contact)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Commande introuvable.");
      setOrder(data);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setStatus("error");
    }
  }

  useEffect(() => {
    if (searchParams.get("order") && searchParams.get("phone")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- auto-lookup order passed via URL params
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeStepIndex = order ? steps.findIndex((s) => s.key === order.status) : -1;

  return (
    <div className="container-luneo py-10">
      <h1 className="text-2xl font-bold text-luneo-black sm:text-3xl">Suivi de commande</h1>
      <p className="mt-2 max-w-xl text-sm text-black/60">
        Saisissez votre numéro de commande et votre téléphone ou email pour suivre l&apos;état
        de votre livraison.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex max-w-xl flex-col gap-4 sm:flex-row">
        <input
          required
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Numéro de commande"
          className="input"
        />
        <input
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Téléphone ou email"
          className="input"
        />
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "..." : "Rechercher"}
        </Button>
      </form>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-luneo-red">
          {error}
        </p>
      )}

      {order && (
        <div className="mt-10 max-w-2xl rounded-2xl border border-luneo-gray-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-luneo-black">{order.orderNumber}</h2>
            <span className="text-sm text-black/50">{formatPrice(order.total)}</span>
          </div>

          <div className="mt-8 flex flex-col gap-0 sm:flex-row sm:items-center">
            {steps.map((step, index) => (
              <div key={step.key} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      index <= activeStepIndex
                        ? "bg-luneo-red text-white"
                        : "bg-luneo-gray text-black/40"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="max-w-[90px] text-[11px] text-black/60">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-1 hidden h-0.5 flex-1 sm:block ${
                      index < activeStepIndex ? "bg-luneo-red" : "bg-luneo-gray"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <ul className="mt-8 space-y-2 border-t border-luneo-gray-border pt-4 text-sm text-black/70">
            {order.items.map((item) => (
              <li key={item.reference} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="container-luneo py-10">Chargement...</div>}>
      <OrderTrackingForm />
    </Suspense>
  );
}
