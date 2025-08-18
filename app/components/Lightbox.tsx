"use client";
import { useEffect, useRef, useCallback } from "react";

type Props = {
  images: string[];
  index: number;               // стартовый индекс
  onClose: () => void;         // закрыть
  onIndex: (next: number) => void; // смена индекса
};

export default function Lightbox({ images, index, onClose, onIndex }: Props) {
  const startX = useRef<number | null>(null);

  const prev = useCallback(() => {
    const next = (index - 1 + images.length) % images.length;
    onIndex(next);
  }, [index, images.length, onIndex]);

  const next = useCallback(() => {
    const next = (index + 1) % images.length;
    onIndex(next);
  }, [index, images.length, onIndex]);

  // клавиатура
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // свайпы
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 50) {
      dx > 0 ? prev() : next();
    }
    startX.current = null;
  };

  // предварительная подгрузка соседних
  useEffect(() => {
    const a = new Image(); a.src = images[(index + 1) % images.length];
    const b = new Image(); b.src = images[(index - 1 + images.length) % images.length];
  }, [index, images]);

  return (
    <div className="lb-overlay" onClick={onClose} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <button className="lb-btn lb-close" aria-label="Close" onClick={(e) => { e.stopPropagation(); onClose(); }}>✕</button>

      <button className="lb-btn lb-prev" aria-label="Previous"
        onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>

      <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
        {/* Используем <img> чтобы избежать ограничений next/image в модалке */}
        <img className="lb-img" src={images[index]} alt={`image ${index + 1} of ${images.length}`} />
        <figcaption className="lb-cap">{index + 1} / {images.length}</figcaption>
      </figure>

      <button className="lb-btn lb-next" aria-label="Next"
        onClick={(e) => { e.stopPropagation(); next(); }}>›</button>
    </div>
  );
}
