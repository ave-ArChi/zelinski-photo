import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { getImages, saveOrder } from "@/app/lib/data";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getImages());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await req.formData();
  const files = form.getAll("files") as File[];
  if (!files.length) return NextResponse.json({ error: "No files" }, { status: 400 });
  for (const file of files) {
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(IMAGES_DIR, file.name), buf);
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { filename } = await req.json();
  const target = path.join(IMAGES_DIR, path.basename(filename));
  if (fs.existsSync(target)) fs.unlinkSync(target);
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { order } = await req.json();
  saveOrder(order.map((p: string) => path.basename(p)));
  return NextResponse.json({ ok: true });
}
