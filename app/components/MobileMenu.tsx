"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Закрывать при переходе
  useEffect(() => { setOpen(false); }, [pathname]);

  // Блокировать скролл когда открыто
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button className="mob-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
        <span className={open ? "open" : ""}></span>
        <span className={open ? "open" : ""}></span>
        <span className={open ? "open" : ""}></span>
      </button>

      {open && <div className="mob-backdrop" onClick={() => setOpen(false)} />}

      <nav className={`mob-nav ${open ? "open" : ""}`}>
        <div className="mob-nav-logo">Zelinski Photo</div>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/pricing">Prices</Link>
        <Link href="/about">About & Contacts</Link>
        <div className="mob-nav-divider" />
        <a href="https://t.me/madinazelinski" target="_blank" rel="noopener noreferrer" className="mob-nav-tg">
          Telegram →
        </a>
      </nav>
    </>
  );
}