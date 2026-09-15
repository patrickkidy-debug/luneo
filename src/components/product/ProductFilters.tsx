"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import type { Brand } from "@prisma/client";

const genderOptions = [
  { value: "HOMME", label: "Homme" },
  { value: "FEMME", label: "Femme" },
  { value: "UNISEXE", label: "Unisexe" },
];

const typeOptions = [
  { value: "VUE", label: "Vue" },
  { value: "SOLAIRE", label: "Solaire" },
];

const shapeOptions = [
  { value: "RONDE", label: "Ronde" },
  { value: "CARREE", label: "Carrée" },
  { value: "RECTANGULAIRE", label: "Rectangulaire" },
  { value: "OVALE", label: "Ovale" },
  { value: "PAPILLON", label: "Papillon" },
  { value: "AVIATEUR", label: "Aviateur" },
];

const sortOptions = [
  { value: "pertinence", label: "Pertinence" },
  { value: "nouveautes", label: "Nouveautés" },
  { value: "prix-asc", label: "Prix croissant" },
  { value: "prix-desc", label: "Prix décroissant" },
  { value: "meilleures-ventes", label: "Meilleures ventes" },
];

function FilterGroup({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: { value: string; label: string }[];
  active: string | null;
  onSelect: (value: string | null) => void;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-luneo-black">{label}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = active === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(isActive ? null : option.value)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "border-luneo-red bg-luneo-red text-white"
                  : "border-luneo-gray-border text-luneo-black/70 hover:border-luneo-red hover:text-luneo-red"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProductFilters({ brands }: { brands: Brand[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function applyPriceRange() {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function resetFilters() {
    setMinPrice("");
    setMaxPrice("");
    router.push(pathname, { scroll: false });
  }

  const hasActiveFilters = Array.from(searchParams.keys()).length > 0;

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-luneo-gray-border bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-luneo-black">Filtres</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-medium text-luneo-red hover:underline"
          >
            Réinitialiser
          </button>
        )}
      </div>

      <div>
        <label htmlFor="sort" className="text-sm font-semibold text-luneo-black">
          Trier par
        </label>
        <select
          id="sort"
          value={searchParams.get("sort") ?? "pertinence"}
          onChange={(event) => updateParam("sort", event.target.value)}
          className="mt-2 w-full rounded-lg border border-luneo-gray-border bg-white px-3 py-2 text-sm outline-none focus:border-luneo-red"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <FilterGroup
        label="Genre"
        options={genderOptions}
        active={searchParams.get("gender")}
        onSelect={(value) => updateParam("gender", value)}
      />

      <FilterGroup
        label="Type"
        options={typeOptions}
        active={searchParams.get("type")}
        onSelect={(value) => updateParam("type", value)}
      />

      <FilterGroup
        label="Forme"
        options={shapeOptions}
        active={searchParams.get("shape")}
        onSelect={(value) => updateParam("shape", value)}
      />

      {brands.length > 0 && (
        <FilterGroup
          label="Marque"
          options={brands.map((b) => ({ value: b.slug, label: b.name }))}
          active={searchParams.get("brand")}
          onSelect={(value) => updateParam("brand", value)}
        />
      )}

      <div>
        <h3 className="text-sm font-semibold text-luneo-black">Prix (FCFA)</h3>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            onBlur={applyPriceRange}
            className="w-full rounded-lg border border-luneo-gray-border px-3 py-2 text-sm outline-none focus:border-luneo-red"
          />
          <span className="text-black/30">–</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            onBlur={applyPriceRange}
            className="w-full rounded-lg border border-luneo-gray-border px-3 py-2 text-sm outline-none focus:border-luneo-red"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-luneo-black">
        <input
          type="checkbox"
          checked={searchParams.get("inStock") === "1"}
          onChange={(event) => updateParam("inStock", event.target.checked ? "1" : null)}
          className="h-4 w-4 rounded border-luneo-gray-border accent-luneo-red"
        />
        Disponible uniquement
      </label>
    </div>
  );
}
