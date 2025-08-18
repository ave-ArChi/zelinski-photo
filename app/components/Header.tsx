'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-row">
        <Link href="/" className="brand" aria-label="Zelinski Photo – Home">
          ZELINSKI PHOTO
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/prices">Prices</Link>
          <Link href="/about">About & Contacts</Link>
          <a href="https://t.me/tg_ArChi" target="_blank" rel="noopener noreferrer">Telegram</a>
        </nav>

        {/* Burger button (mobile) */}
        <button
          className="burger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span/><span/><span/>
        </button>
      </div>

      {/* Mobile drawer */}
      <nav className={`nav-mobile ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/prices">Prices</Link>
        <Link href="/about">About & Contacts</Link>
        <a href="https://t.me/tg_ArChi" target="_blank" rel="noopener noreferrer">Telegram</a>
      </nav>
    </header>
  );
}
