"use client";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load cart
  useEffect(() => {
    async function load() {
      try {
        const r = await fetch("/api/cart", {
          method: "GET",
          credentials: "include",
          cache: "no-store"
        });

        const j = await r.json();
        setCart(Array.isArray(j.cart?.items) ? j.cart.items : []);
      } catch (err) {
        console.error("Load cart failed:", err);
      }
      setLoaded(true);
    }
    load();
  }, []);

  // Save cart
  async function save(items) {
    setCart(items);
    try {
      await fetch("/api/cart", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items })
      });
    } catch (err) {
      console.error("Save cart failed:", err);
    }
  }

  function addToCart(product) {
    if (!loaded) return;

    const id = String(product.id ?? product._id);
    const copy = [...cart];

    const index = copy.findIndex((i) => i.id === id);

    if (index >= 0) {
      copy[index].quantity += 1;
    } else {
      copy.push({
        id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }

    save(copy);
  }

  function updateQuantity(id, qty) {
    const updated = cart.map((i) =>
      i.id === id ? { ...i, quantity: qty } : i
    );
    save(updated);
  }

  function removeFromCart(id) {
    const updated = cart.filter((i) => i.id !== id);
    save(updated);
  }

  return (
    <CartContext.Provider value={{ cart, loaded, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
