import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic"; // отключаем SSG
export const revalidate = 0;            // запрет ISR

export async function GET() {
  const dir = path.join(process.cwd(), "public", "images");
  let files = [];
  try {
    files = fs.readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .sort()
      .map((f) => `/images/${f}`);
  } catch (e) {}

  return new Response(JSON.stringify(files), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",   // важное
    },
  });
}
