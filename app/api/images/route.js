import { getImages } from "@/app/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const files = getImages();
  return new Response(JSON.stringify(files), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
