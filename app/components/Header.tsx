// app/components/Header.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-row">
        <Link href="/" className="brand" aria-label="Zelinski Photo – Home">
          ZELINSKI PHOTO
        </Link>

        {/* Меню на десктопе */}
        <nav className="nav-desktop">
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/prices">Prices</Link>
          <Link href="/about">About & Contacts</Link>
          <a href="https://t.me/tg_ArChi" target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
        </nav>

        {/* Бургер на мобиле/планшете */}
        <button
          className={`burger ${open ? "active" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Выдвижное мобильное меню */}
      <nav className={`nav-mobile ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/prices">Prices</Link>
        <Link href="/about">About & Contacts</Link>
        <a href="https://t.me/tg_ArChi" target="_blank" rel="noopener noreferrer">
          Telegram
        </a>
      </nav>
    </header>
  );
}
