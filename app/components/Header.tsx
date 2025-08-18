"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" style={{ position: "sticky", top: 0, zIndex: 40, background: "#fff", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
      <div className="container header-row" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <Link href="/" className="brand" style={{ color: "#111", textDecoration: "none", fontWeight: 800, letterSpacing: ".28em", fontSize: "clamp(18px,4.2vw,28px)", whiteSpace: "nowrap" }}>
          ZELINSKI PHOTO
        </Link>

        {/* Десктоп-меню */}
        <nav className="nav-desktop" style={{ display: "flex", gap: 24 }}>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/prices">Prices</Link>
          <Link href="/about">About & Contacts</Link>
          <a href="https://t.me/tg_ArChi" target="_blank" rel="noopener noreferrer">Telegram</a>
        </nav>

        {/* Бургер для мобильных */}
        <button
          className={`burger ${open ? "active" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          style={{ display: "none", width: 40, height: 40, border: 0, background: "transparent", padding: 0, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 5 }}
        >
          <span style={{ display: "block", width: 22, height: 2, background: "#111", borderRadius: 2 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#111", borderRadius: 2 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#111", borderRadius: 2 }} />
        </button>
      </div>

      {/* Мобильное меню-выдвижка */}
      <nav className={`nav-mobile ${open ? "open" : ""}`}>
        <Link href="/portfolio" onClick={() => setOpen(false)}>Portfolio</Link>
        <Link href="/prices" onClick={() => setOpen(false)}>Prices</Link>
        <Link href="/about" onClick={() => setOpen(false)}>About & Contacts</Link>
        <a href="https://t.me/tg_ArChi" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Telegram</a>
      </nav>
    </header>
  );
}
