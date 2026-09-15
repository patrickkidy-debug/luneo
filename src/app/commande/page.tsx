"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { computeShippingCost } from "@/lib/shipping";

const deliveryModes = [
  { value: "domicile", label: "Livraison à domicile" },
  { value: "boutique", label: "Retrait en boutique" },
];

const paymentMethods = [
  { value: "LIVRAISON", label: "Paiement à la livraison" },
  { value: "MOBILE_MONEY", label: "Mobile Money" },
  { value: "CARTE", label: "Carte bancaire" },
];

type Status = "idle" | "loading" | "success" | "error";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const shipping = computeShippingCost(subtotal);
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "Abidjan",
    quartier: "",
    deliveryMode: "domicile",
    paymentMethod: "LIVRAISON",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Impossible de valider la commande.");

      setOrderNumber(data.orderNumber);
      setStatus("success");
      clear();

      try {
        const raw = window.localStorage.getItem("luneo_order_history");
        const history = raw ? JSON.parse(raw) : [];
        window.localStorage.setItem(
          "luneo_order_history",
          JSON.stringify([{ orderNumber: data.orderNumber, date: new Date().toISOString() }, ...history])
        );
        window.localStorage.setItem(
          "luneo_profile",
          JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
          })
        );
      } catch {
        // localStorage indisponible
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setStatus("error");
    }
  }

  if (items.length === 0 && status !== "success") {
    return (
      <div className="container-luneo flex flex-col items-center gap-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-luneo-black">Votre panier est vide</h1>
        <p className="max-w-md text-sm text-black/60">
          Ajoutez des produits à votre panier avant de passer commande.
        </p>
        <Button href="/lunettes-de-vue">Continuer mes achats</Button>
      </div>
    );
  }

  if (status === "success" && orderNumber) {
    return (
      <div className="container-luneo flex flex-col items-center gap-6 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-luneo-red text-2xl text-white">
          ✓
        </span>
        <h1 className="text-2xl font-bold text-luneo-black">Commande enregistrée</h1>
        <p className="max-w-md text-sm text-black/60">
          Votre commande <strong>{orderNumber}</strong> a bien été reçue. Notre équipe vous
          contactera au {form.phone} pour confirmer les modalités.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={`/suivi-commande?order=${orderNumber}&phone=${encodeURIComponent(form.phone)}`}>
            Suivre ma commande
          </Button>
          <Button href="/" variant="outline">
            Retour à l&apos;accueil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-luneo py-10">
      <h1 className="text-2xl font-bold text-luneo-black sm:text-3xl">Passer la commande</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Prénom" required>
              <input
                required
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Nom" required>
              <input
                required
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Téléphone" required>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="input"
                placeholder="07 00 00 00 00"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <Field label="Adresse" required>
            <input
              required
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className="input"
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Ville" required>
              <input
                required
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Quartier">
              <input
                value={form.quartier}
                onChange={(e) => update("quartier", e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <Field label="Mode de livraison">
            <div className="flex flex-wrap gap-2">
              {deliveryModes.map((mode) => (
                <label
                  key={mode.value}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    form.deliveryMode === mode.value
                      ? "border-luneo-red bg-luneo-red text-white"
                      : "border-luneo-gray-border text-luneo-black/70"
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMode"
                    value={mode.value}
                    checked={form.deliveryMode === mode.value}
                    onChange={(e) => update("deliveryMode", e.target.value)}
                    className="sr-only"
                  />
                  {mode.label}
                </label>
              ))}
            </div>
          </Field>

          <Field label="Mode de paiement">
            <div className="flex flex-col gap-2">
              {paymentMethods.map((method) => (
                <label
                  key={method.value}
                  className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                    form.paymentMethod === method.value
                      ? "border-luneo-red bg-luneo-gray"
                      : "border-luneo-gray-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={form.paymentMethod === method.value}
                    onChange={(e) => update("paymentMethod", e.target.value)}
                    className="mr-2 accent-luneo-red"
                  />
                  {method.label}
                </label>
              ))}
            </div>
            {form.paymentMethod !== "LIVRAISON" && (
              <p className="mt-2 text-xs text-black/50">
                Aucun fournisseur de paiement n&apos;est encore connecté pour ce mode. Votre
                commande sera enregistrée et notre équipe vous contactera pour finaliser le
                règlement.
              </p>
            )}
          </Field>

          {error && (
            <p role="alert" className="text-sm text-luneo-red">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" disabled={status === "loading"}>
            {status === "loading" ? "Validation en cours..." : "Valider la commande"}
          </Button>
        </form>

        <div className="h-fit rounded-2xl border border-luneo-gray-border bg-luneo-gray p-6">
          <h2 className="text-base font-bold text-luneo-black">Résumé</h2>
          <ul className="mt-4 space-y-2 text-sm text-black/70">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-luneo-gray-border pt-4 text-sm">
            <div className="flex justify-between text-black/70">
              <span>Sous-total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-black/70">
              <span>Livraison</span>
              <span>{shipping === 0 ? "Offerte" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-luneo-black">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <Link href="/panier" className="mt-4 inline-block text-xs font-medium text-luneo-black/60 hover:text-luneo-red">
            Modifier le panier
          </Link>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-luneo-black">
        {label} {required && <span className="text-luneo-red">*</span>}
      </span>
      {children}
    </label>
  );
}
