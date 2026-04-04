import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDER_FILE = path.join(DATA_DIR, "order.json");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const IMAGES_DIR = path.join(process.cwd(), "public", "images");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function getImages(): string[] {
  const files = fs.existsSync(IMAGES_DIR)
    ? fs.readdirSync(IMAGES_DIR).filter(f => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
    : [];

  if (!fs.existsSync(ORDER_FILE)) return files.sort().map(f => `/images/${f}`);

  const order: string[] = JSON.parse(fs.readFileSync(ORDER_FILE, "utf-8"));
  const ordered = order.filter(f => files.includes(f));
  const rest = files.filter(f => !order.includes(f)).sort();
  return [...ordered, ...rest].map(f => `/images/${f}`);
}

export function saveOrder(order: string[]) {
  ensureDataDir();
  fs.writeFileSync(ORDER_FILE, JSON.stringify(order, null, 2));
}

export type Content = {
  about: string;
  packages: { name: string; price: string; note: string; features: string[] }[];
};

const DEFAULT_CONTENT: Content = {
  about: `Привет! Меня зовут Мадина, я профессиональный фотограф и ретушёр.\nИмею 7-летний опыт коммерческих и творческих съёмок, модельных тестов и бьюти фотографии, знаю всё о качественной, красивой и естественной ретуши.\nОбожаю весь процесс от подготовки до воплощения идеи. Организовываю и стилизую съёмки, занимаюсь креативным мейкапом по запросу.\nПомогаю воплощать самые необычные идеи.`,
  packages: [
    {
      name: "Creative",
      price: "15 000 ₽",
      note: "* Формат для модельных тестов, портретов и beauty-съёмок, съёмок с вашей стилизацией.",
      features: ["1–2 часа съёмки", "15 лучших фото с качественной ретушью", "Срок обработки: 1–2 недели"],
    },
    {
      name: "Personal",
      price: "35 000 ₽",
      note: "",
      features: ["1–2 часа съёмки (зависит от темпа)", "20 лучших фото с high-end ретушью", "Срок обработки: 1–2 недели"],
    },
  ],
};

export function getContent(): Content {
  if (!fs.existsSync(CONTENT_FILE)) return DEFAULT_CONTENT;
  return JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
}

export function saveContent(content: Content) {
  ensureDataDir();
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));
}
