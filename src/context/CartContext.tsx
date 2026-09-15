"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine } from "@/lib/types";

const STORAGE_KEY = "luneo_cart";

type CartContextValue = {
  items: CartLine[];
  count: number;
  subtotal: number;
  addItem: (item: Omit<CartLine, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  lastAdded: CartLine | null;
  clearLastAdded: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartLine | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate cart from localStorage once on mount
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage indisponible, panier reste vide
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // stockage plein ou indisponible, on ignore
    }
  }, [items, hydrated]);

  const addItem = useCallback<CartContextValue["addItem"]>((item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((line) => line.productId === item.productId);
      let next: CartLine[];
      if (existing) {
        next = prev.map((line) =>
          line.productId === item.productId
            ? { ...line, quantity: line.quantity + quantity }
            : line
        );
      } else {
        next = [...prev, { ...item, quantity }];
      }
      setLastAdded({ ...item, quantity });
      return next;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((line) => line.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((line) => line.productId !== productId);
      return prev.map((line) =>
        line.productId === productId ? { ...line, quantity } : line
      );
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const clearLastAdded = useCallback(() => setLastAdded(null), []);

  const count = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity * line.price, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      lastAdded,
      clearLastAdded,
    }),
    [items, count, subtotal, addItem, removeItem, updateQuantity, clear, lastAdded, clearLastAdded]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans un CartProvider");
  return ctx;
}
