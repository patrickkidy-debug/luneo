"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({ onSubmit }: { onSubmit?: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/recherche?q=${encodeURIComponent(trimmed)}` : "/recherche");
    onSubmit?.();
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="relative w-full">
      <label htmlFor="site-search" className="sr-only">
        Rechercher un produit
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Rechercher une monture, une marque..."
        className="w-full rounded-full border border-luneo-gray-border bg-luneo-gray px-5 py-2.5 text-sm text-luneo-black outline-none transition-colors focus:border-luneo-red"
      />
      <button
        type="submit"
        aria-label="Lancer la recherche"
        className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-luneo-red text-white transition-colors hover:bg-luneo-red-dark"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}
