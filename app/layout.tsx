// app/layout.js
import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "Zelinski Photo",
  description: "Портфолио фотографа и ретушёра",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main className="container" style={{ minHeight: "70vh" }}>{children}</main>

        {/* Простой футер (виден даже без CSS) */}
        <footer style={{
          borderTop: "1px solid rgba(0,0,0,.06)",
          marginTop: 24,
          padding: "16px 0",
          textAlign: "center",
          color: "#666",
          fontSize: 12
        }}>
          © {new Date().getFullYear()} Zelinski Photo ·{" "}
          <a href="https://t.me/tg_ArChi" target="_blank" rel="noopener noreferrer">
            Написать в Telegram
          </a>
        </footer>
      </body>
    </html>
  );
}
