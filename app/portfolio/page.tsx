"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PortfolioPage() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Ошибка загрузки изображений:", err));
  }, []);

  const openLightbox = (index: number) => setCurrentIndex(index);
  const closeLightbox = () => setCurrentIndex(null);

  const showPrev = () => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    }
  };

  const showNext = () => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % images.length);
    }
  };

  return (
    <div>
      {/* Галерея */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="cursor-pointer relative w-full aspect-square"
            onClick={() => openLightbox(idx)}
          >
            <Image
              src={`/images/${src}`}
              alt={`Фото ${idx + 1}`}
              fill
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>

      {/* Лайтбокс */}
      {currentIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-6 text-white text-3xl"
          >
            ✕
          </button>

          <button
            onClick={showPrev}
            className="absolute left-4 text-white text-4xl px-3"
          >
            ‹
          </button>

          <div className="relative w-[90%] h-[80%]">
            <Image
              src={`/images/${images[currentIndex]}`}
              alt={`Фото ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={showNext}
            className="absolute right-4 text-white text-4xl px-3"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
