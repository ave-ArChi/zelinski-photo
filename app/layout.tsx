import "./globals.css";
import Link from "next/link";
import Header from './components/Header';

export const metadata = {
  title: "Zelinski Photo",
  description: "Портфолио фотографа и ретушёра",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {/* Top centered title with soft bottom border */}
        <div className="border-b border-soft">
          <div className="max-w-7xl mx-auto py-4 text-center">
            <div className="font-extrabold tracking-[0.25em] text-2xl md:text-3xl">
              ZELINSKI PHOTO
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-[220px_1fr] gap-8 px-4 md:px-6">
          {/* Left sidebar with soft right border */}
          <aside className="pt-6 border-r border-soft pr-6 hidden md:block">
            <nav className="space-y-3 text-xs uppercase tracking-wider text-neutral-600">
              <Link className="block hover:text-black" href="/portfolio">Portfolio</Link>
              <Link className="block hover:text-black" href="/pricing">Prices</Link>
              <Link className="block hover:text-black" href="/about">About & Contacts</Link>
              <a className="inline-block mt-4 px-3 py-2 border border-soft rounded hover:bg-black/5"
                 href="https://t.me/madinazelinski" target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
            </nav>
          </aside>

          {/* Main content */}
          <main className="min-h-[80vh]">{children}</main>
        </div>

        <div className="border-t border-soft mt-8">
          <div className="max-w-7xl mx-auto text-center text-xs text-neutral-500 py-4">
            © {new Date().getFullYear()} Zelinski Photo · <a className="underline" href="https://t.me/madinazelinski" target="_blank">Написать в Telegram</a>
          </div>
        </div>
      </body>
    </html>
  );
}
