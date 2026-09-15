"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="mt-4 text-sm font-medium text-luneo-red">✓ Merci, vous êtes inscrit(e) !</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Votre email"
          aria-label="Votre email"
          className="w-full rounded-full border border-luneo-gray-border bg-white px-4 py-2.5 text-sm outline-none focus:border-luneo-red"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-luneo-red px-5 py-2.5 text-sm font-medium text-white hover:bg-luneo-red-dark disabled:opacity-60"
        >
          {status === "loading" ? "..." : "S'inscrire"}
        </button>
      </form>
      {status === "error" && (
        <p role="alert" className="mt-2 text-xs text-luneo-red">
          Une erreur est survenue, réessayez.
        </p>
      )}
    </div>
  );
}
