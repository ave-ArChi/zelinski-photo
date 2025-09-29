// app/components/Header.jsx
"use client";
import Link from "next/link";

export default function Header() {
  return (
    <div style={{ padding: 12, textAlign: "center" }}>
      <Link href="/" style={{ fontWeight: 800, letterSpacing: ".25em", textDecoration: "none", color: "#111" }}>
        ZELINSKI PHOTO
      </Link>
    </div>
  );
}
