import type { Store } from "@prisma/client";
import { Button } from "@/components/ui/Button";

export function StoreCard({ store }: { store: Store }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-luneo-gray-border bg-white p-6">
      <div>
        <h3 className="text-lg font-bold text-luneo-black">{store.name}</h3>
        <p className="mt-2 text-sm text-black/60">{store.address}</p>
        <p className="text-sm text-black/60">{store.city}</p>
        <p className="mt-3 text-sm font-medium text-luneo-black">{store.phone}</p>
        <p className="text-sm text-black/50">{store.hours}</p>
      </div>

      <div className="mt-auto flex flex-wrap gap-3 pt-2">
        {store.mapUrl && (
          <Button href={store.mapUrl} target="_blank" rel="noreferrer" size="sm" variant="outline">
            Itinéraire
          </Button>
        )}
        <Button href={`tel:${store.phone.replace(/\s/g, "")}`} size="sm">
          Contacter la boutique
        </Button>
      </div>
    </div>
  );
}
