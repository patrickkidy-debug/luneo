"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mainNav } from "@/lib/nav";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { SearchBar } from "./SearchBar";
import { MobileDrawer } from "./MobileDrawer";
import { Logo } from "@/components/brand/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count: cartCount } = useCart();
  const { count: favoritesCount } = useFavorites();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between gap-4 rounded-full border-2 border-luneo-black/10 bg-luneo-card/95 pl-6 pr-2 backdrop-blur-md transition-[padding,box-shadow] duration-200 ${
          scrolled ? "py-1.5 shadow-lg" : "py-2.5 shadow-md"
        }`}
      >
        <Link href="/" aria-label="LUNEO, accueil" className="shrink-0 text-base">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-luneo-black/80 transition-colors hover:text-luneo-red"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden w-full max-w-xs md:block">
          <SearchBar />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Rechercher"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-luneo-gray md:hidden"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <Link
            href="/compte"
            aria-label="Mon compte"
            className="hidden h-10 w-10 items-center justify-center rounded-full hover:bg-luneo-gray sm:flex"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>

          <Link
            href="/favoris"
            aria-label="Mes favoris"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full hover:bg-luneo-gray sm:flex"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 20s-7-4.35-9.5-8.8C.8 7.9 2.4 4.5 6 4.5c2 0 3.5 1.2 4 2.3.5-1.1 2-2.3 4-2.3 3.6 0 5.2 3.4 3.5 6.7C19 15.65 12 20 12 20Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            {favoritesCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-luneo-red text-[10px] font-bold text-white">
                {favoritesCount}
              </span>
            )}
          </Link>

          <Link
            href="/panier"
            aria-label="Mon panier"
            className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-luneo-gray"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6h15l-1.5 9h-12L6 6Zm0 0-1-3H2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="20" r="1.5" fill="currentColor" />
              <circle cx="18" cy="20" r="1.5" fill="currentColor" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-luneo-red text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-luneo-gray lg:hidden"
            onClick={() => setDrawerOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="mx-auto mt-2 rounded-2xl bg-white px-4 py-3 shadow-md md:hidden">
          <SearchBar onSubmit={() => setSearchOpen(false)} />
        </div>
      )}

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
