// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Zelinski Photo",
  description: "Портфолио фотографа и ретушёра",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
