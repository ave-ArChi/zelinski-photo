// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import MobileMenu from "./components/MobileMenu";

export const metadata = {
  title: "Zelinski Photo",
  description: "Портфолио фотографа и ретушёра",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div className="topbar">
          <div className="container">
            <div className="brand">Zelinski Photo</div>
            <MobileMenu />
          </div>
        </div>

        <div className="container main-grid">
          <aside className="sidebar">
            <nav className="side-nav">
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/pricing">Prices</Link>
              <Link href="/about">About & Contacts</Link>
              <div className="side-nav-divider" />
              <a href="https://t.me/madinazelinski" target="_blank" rel="noopener noreferrer" className="side-tg">
                Telegram
              </a>
            </nav>
          </aside>
          <main className="content">
            {children}
          </main>
        </div>

        <footer className="site-footer">
          © {new Date().getFullYear()} Zelinski Photo · <a href="https://t.me/madinazelinski" target="_blank" rel="noopener noreferrer">Написать в Telegram</a>
        </footer>
      </body>
    </html>
  );
}