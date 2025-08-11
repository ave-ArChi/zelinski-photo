'use client';
import { useEffect, useState, useRef } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function PortfolioPage() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    fetch('/api/images').then(r => r.json()).then(setImages).catch(() => setImages([]));
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const recalc = () => {
      const s = getComputedStyle(grid);
      const rowHeight = parseInt(s.getPropertyValue('grid-auto-rows'));
      const rowGap = parseInt(s.getPropertyValue('grid-row-gap'));
      grid.querySelectorAll('.grid-item').forEach((item) => {
        const el = item;
        const img = el.querySelector('img');
        if (!img || !img.complete) return;
        const h = img.getBoundingClientRect().height;
        const span = Math.ceil((h + rowGap) / (rowHeight + rowGap));
        el.style.gridRowEnd = `span ${span}`;
      });
    };

    recalc();
    window.addEventListener('resize', recalc);
    grid.querySelectorAll('img').forEach((img) => img.addEventListener('load', recalc));
    return () => {
      window.removeEventListener('resize', recalc);
      grid.querySelectorAll('img').forEach((img) => img.removeEventListener('load', recalc));
    };
  }, [images]);

  const wide = new Set([2,7,13,18,23]);

  return (
    <section className="pt-6">
      {images.length === 0 ? (
        <div className="text-sm text-neutral-600">
          Положите файлы в <code>public/images</code> (jpg/png/webp) и обновите страницу.
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2" style={{ gridAutoRows: '5px', gridAutoFlow: 'dense' }}>
          {images.map((src, i) => (
            <div key={src} className={`grid-item overflow-hidden rounded-sm ${wide.has(i) ? 'lg:col-span-2' : ''}`} style={{ cursor: 'pointer' }}>
              <img src={src} alt={`img-${i}`} className="w-full h-auto block" loading="lazy" onClick={() => setIndex(i)} />
            </div>
          ))}
        </div>
      )}

      {index !== null && (
        <Lightbox open index={index} close={() => setIndex(null)} slides={images.map((src) => ({ src }))} />
      )}
    </section>
  );
}