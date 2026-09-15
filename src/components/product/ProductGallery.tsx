"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  productName,
}: {
  images: { url: string; alt: string }[];
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-luneo-gray">
        {active && (
          <Image
            src={active.url}
            alt={active.alt || productName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={image.url + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Voir l'image ${index + 1} de ${productName}`}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                index === activeIndex ? "border-luneo-red" : "border-transparent"
              }`}
            >
              <Image src={image.url} alt={image.alt || productName} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
