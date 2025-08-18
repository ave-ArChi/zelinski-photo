"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Lightbox from "../components/Lightbox";

export default function PortfolioPage() {
  const [images, setImages] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    fetch(`/api/images?ts=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((arr) => setImages(Array.isArray(arr) ? arr : []))
      .catch(() => setImages([]));
  }, []);

  const openAt = (i: number) => { setIdx(i); setOpen(true); };

  return (
    <>
      <section className="gallery" aria-label="Portfolio gallery">
        {images.map((src, i) => (
          <button
            key={src}
            className="gallery-item"
            onClick={() => openAt(i)}
            aria-label="Open image"
            style={{ cursor: "zoom-in", background: "transparent", padding: 0, border: 0 }}
          >
            <Image
              src={src}
              alt=""
              width={1200}
              height={1600}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ width: "100%", height: "auto" }}
            />
          </button>
        ))}
      </section>

      {open && images.length > 0 && (
        <Lightbox images={images} index={idx} onClose={() => setOpen(false)} onIndex={setIdx} />
      )}
    </>
  );
}
