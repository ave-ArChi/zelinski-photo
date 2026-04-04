"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      const d = await res.json();
      setError(d.error || "Ошибка");
    }
    setLoading(false);
  }

  return (
    <div className="admin-login-wrap">
      <form className="admin-login-form" onSubmit={submit}>
        <div className="admin-login-logo">ZELINSKI PHOTO</div>
        <div className="admin-login-sub">Панель управления</div>
        {error && <div className="admin-error">{error}</div>}
        <div className="admin-field">
          <label>Логин</label>
          <input type="text" value={login} onChange={e => setLogin(e.target.value)} autoFocus />
        </div>
        <div className="admin-field">
          <label>Пароль</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="admin-btn-primary" disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}
