// app/layout.js
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Zelinski Photo",
  description: "Портфолио фотографа и ретушёра",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {/* Top title */}
        <div className="topbar">
          <div className="container">
            <div className="brand">ZELINSKI PHOTO</div>
          </div>
        </div>

        <div className="container main-grid">
          <aside className="sidebar">
            <nav className="side-nav">
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/pricing">Prices</Link>
              <Link href="/about">About & Contacts</Link>
              <a href="https://t.me/tg_ArChi" target="_blank" rel="noopener noreferrer">Telegram</a>
            </nav>
          </aside>

          <main className="content">
            {children}
          </main>
        </div>

        <footer className="site-footer">
          © {new Date().getFullYear()} Zelinski Photo · <a href="https://t.me/tg_ArChi" target="_blank" rel="noopener noreferrer">Написать в Telegram</a>
        </footer>
      </body>
    </html>
  );
}
