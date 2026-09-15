"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { Button } from "@/components/ui/Button";

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type OrderHistoryEntry = { orderNumber: string; date: string };

const emptyProfile: Profile = { firstName: "", lastName: "", email: "", phone: "" };

export default function AccountPage() {
  const { count: favoritesCount } = useFavorites();
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [saved, setSaved] = useState(false);
  const [orders, setOrders] = useState<OrderHistoryEntry[]>([]);

  useEffect(() => {
    try {
      const rawProfile = window.localStorage.getItem("luneo_profile");
      const rawOrders = window.localStorage.getItem("luneo_order_history");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate profile/orders from localStorage once on mount
      if (rawProfile) setProfile(JSON.parse(rawProfile));
      if (rawOrders) setOrders(JSON.parse(rawOrders));
    } catch {
      // localStorage indisponible
    }
  }, []);

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    try {
      window.localStorage.setItem("luneo_profile", JSON.stringify(profile));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // ignore
    }
  }

  function handleLogout() {
    setProfile(emptyProfile);
    try {
      window.localStorage.removeItem("luneo_profile");
    } catch {
      // ignore
    }
  }

  return (
    <div className="container-luneo py-10">
      <h1 className="text-2xl font-bold text-luneo-black sm:text-3xl">Mon compte</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col">
          {[
            { label: "Mes informations", href: "#informations" },
            { label: "Mes commandes", href: "#commandes" },
            { label: "Mes favoris", href: "#favoris" },
            { label: "Mes adresses", href: "#adresses" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full border border-luneo-gray-border px-4 py-2 text-sm font-medium text-luneo-black hover:border-luneo-red hover:text-luneo-red lg:rounded-lg"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="whitespace-nowrap rounded-full border border-luneo-gray-border px-4 py-2 text-left text-sm font-medium text-black/50 hover:text-luneo-red lg:rounded-lg"
          >
            Déconnexion
          </button>
        </nav>

        <div className="flex flex-col gap-10">
          <section id="informations" className="rounded-2xl border border-luneo-gray-border bg-white p-6">
            <h2 className="text-lg font-bold text-luneo-black">Mes informations</h2>
            <form onSubmit={handleSave} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                placeholder="Prénom"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                className="input"
              />
              <input
                placeholder="Nom"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                className="input"
              />
              <input
                placeholder="Email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="input"
              />
              <input
                placeholder="Téléphone"
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="input"
              />
              <div className="sm:col-span-2">
                <Button type="submit">{saved ? "✓ Enregistré" : "Enregistrer"}</Button>
              </div>
            </form>
          </section>

          <section id="commandes" className="rounded-2xl border border-luneo-gray-border bg-white p-6">
            <h2 className="text-lg font-bold text-luneo-black">Mes commandes</h2>
            {orders.length === 0 ? (
              <p className="mt-3 text-sm text-black/50">
                Vous n&apos;avez pas encore passé de commande sur ce navigateur.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {orders.map((order) => (
                  <li key={order.orderNumber} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-luneo-black">{order.orderNumber}</span>
                    <Link
                      href={`/suivi-commande?order=${order.orderNumber}&phone=${encodeURIComponent(profile.phone)}`}
                      className="text-luneo-red hover:underline"
                    >
                      Suivre →
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section id="favoris" className="rounded-2xl border border-luneo-gray-border bg-white p-6">
            <h2 className="text-lg font-bold text-luneo-black">Mes favoris</h2>
            <p className="mt-3 text-sm text-black/60">
              {favoritesCount > 0
                ? `Vous avez ${favoritesCount} produit${favoritesCount > 1 ? "s" : ""} en favoris.`
                : "Vous n'avez pas encore de favoris."}
            </p>
            <div className="mt-4">
              <Button href="/favoris" variant="outline" size="sm">
                Voir mes favoris
              </Button>
            </div>
          </section>

          <section id="adresses" className="rounded-2xl border border-luneo-gray-border bg-white p-6">
            <h2 className="text-lg font-bold text-luneo-black">Mes adresses</h2>
            <p className="mt-3 text-sm text-black/60">
              Vos adresses de livraison sont demandées à chaque commande. La gestion d&apos;un
              carnet d&apos;adresses arrivera bientôt.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
