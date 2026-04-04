import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  const { login, password } = await req.json();
  const ok =
    login === (process.env.ADMIN_LOGIN || "admin") &&
    password === (process.env.ADMIN_PASSWORD || "admin");

  if (!ok) return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });

  const token = await signToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
