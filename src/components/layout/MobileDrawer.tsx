"use client";

import Link from "next/link";
import { useEffect } from "react";
import { mainNav } from "@/lib/nav";
import { Logo } from "@/components/brand/Logo";
import { SearchBar } from "./SearchBar";

export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="Fermer le menu"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col gap-6 bg-luneo-card p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-base">
            <Logo />
          </span>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-luneo-gray"
          >
            ✕
          </button>
        </div>

        <SearchBar onSubmit={onClose} />

        <nav className="flex flex-col gap-1">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-lg px-3 py-3 text-base font-medium text-luneo-black hover:bg-luneo-gray"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t border-luneo-gray-border pt-4">
          <Link href="/compte" onClick={onClose} className="px-3 py-2 text-sm font-medium text-luneo-black hover:text-luneo-red">
            Mon compte
          </Link>
          <Link href="/favoris" onClick={onClose} className="px-3 py-2 text-sm font-medium text-luneo-black hover:text-luneo-red">
            Mes favoris
          </Link>
          <Link href="/boutiques" onClick={onClose} className="px-3 py-2 text-sm font-medium text-luneo-black hover:text-luneo-red">
            Nos boutiques
          </Link>
        </div>
      </div>
    </div>
  );
}
