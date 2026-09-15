"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-luneo flex min-h-[50vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <h1 className="text-2xl font-bold text-luneo-black">Une erreur est survenue</h1>
      <p className="max-w-md text-sm text-black/60">
        Impossible de charger cette page pour le moment. Merci de réessayer.
      </p>
      <Button onClick={reset}>Réessayer</Button>
    </div>
  );
}
