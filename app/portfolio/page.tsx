// app/portfolio/page.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PortfolioPage() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Берём список файлов из public/images без кэша
    fetch(`/api/images?ts=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((arr) => setImages(Array.isArray(arr) ? arr : []))
      .catch(() => setImages([]));
  }, []);

  return (
    <section className="gallery" aria-label="Portfolio gallery">
      {images.map((src) => (
        <a key={src} className="gallery-item" href={src} aria-label="Open image">
          <Image
            src={src}
            alt=""
            width={1200}
            height={1600}
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ width: "100%", height: "auto" }}
          />
        </a>
      ))}
    </section>
  );
}
