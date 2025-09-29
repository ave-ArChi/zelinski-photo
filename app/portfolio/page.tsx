// app/portfolio/page.jsx
"use client";
import { useEffect, useState } from "react";
import Lightbox from "../components/Lightbox.jsx";

export default function PortfolioPage() {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    fetch("/api/images?ts="+Date.now(), { cache: "no-store" })
      .then(r => r.json())
      .then(arr => setImages(Array.isArray(arr) ? arr : []))
      .catch(() => setImages([]));
  }, []);

  const openAt = (i) => { setIdx(i); setOpen(true); };
  const close = () => setOpen(false);

  return (
    <>
      <section className="gallery" aria-label="Portfolio gallery">
        {images.map((src, i) => (
          <button key={src} className={`gallery-item size-${(i % 5) + 1}`} onClick={() => openAt(i)} aria-label="Open image">
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </section>

      {open && images.length > 0 && (
        <Lightbox images={images} index={idx} onClose={close} onIndex={setIdx} />
      )}
    </>
  );
}
