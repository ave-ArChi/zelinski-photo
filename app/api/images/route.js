import fs from "fs";
import path from "path";

export async function GET() {
  const dir = path.join(process.cwd(), "public", "images");
  let files = [];
  try {
    files = fs.readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .sort()
      .map((f) => `/images/${f}`);
  } catch (e) {}
  return Response.json(files);
}