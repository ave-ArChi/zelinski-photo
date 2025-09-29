// app/api/images/route.js
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const dir = path.join(process.cwd(), "public", "images");
  let files = [];
  try {
    files = fs.readdirSync(dir)
      .filter(f => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
      .sort()
      .map(f => `/images/${f}`);
  } catch (e) {
    // noop
  }

  return new Response(JSON.stringify(files), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
