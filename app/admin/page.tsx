"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Package = { name: string; price: string; note: string; features: string[] };
type Content = { about: string; packages: Package[] };

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"photos" | "prices" | "about">("photos");

  const [images, setImages] = useState<string[]>([]);
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState<Content | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { loadImages(); loadContent(); }, []);

  async function loadImages() {
    const res = await fetch("/api/admin/images");
    if (res.status === 401) { router.push("/admin/login"); return; }
    setImages(await res.json());
  }

  async function loadContent() {
    const res = await fetch("/api/admin/content");
    if (res.ok) setContent(await res.json());
  }

  async function uploadFiles(files: FileList | File[]) {
    setUploading(true);
    const arr = Array.from(files);
    for (let i = 0; i < arr.length; i++) {
      setUploadProgress(`Загрузка ${i + 1} / ${arr.length}...`);
      const fd = new FormData();
      fd.append("files", arr[i]);
      await fetch("/api/admin/images", { method: "POST", body: fd });
    }
    setUploading(false);
    setUploadProgress("");
    loadImages();
  }

  async function deleteImage(src: string) {
    if (!confirm("Удалить фото?")) return;
    await fetch("/api/admin/images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: src.replace("/images/", "") }),
    });
    loadImages();
  }

  async function saveOrder(newOrder: string[]) {
    await fetch("/api/admin/images", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: newOrder }),
    });
  }

  function onDragStart(i: number) { setDragging(i); }
  function onDragEnter(i: number) { setDragOver(i); }
  function onDragEnd() {
    if (dragging === null || dragOver === null || dragging === dragOver) {
      setDragging(null); setDragOver(null); return;
    }
    const next = [...images];
    const [item] = next.splice(dragging, 1);
    next.splice(dragOver, 0, item);
    setImages(next);
    saveOrder(next);
    setDragging(null); setDragOver(null);
  }

  function onDropZone(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
  }

  async function saveContent() {
    if (!content) return;
    setSaving(true);
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  function updatePackage(i: number, field: keyof Package, value: string | string[]) {
    if (!content) return;
    const pkgs = [...content.packages];
    pkgs[i] = { ...pkgs[i], [field]: value };
    setContent({ ...content, packages: pkgs });
  }

  function addFeature(pi: number) {
    if (!content) return;
    const pkgs = [...content.packages];
    pkgs[pi].features = [...pkgs[pi].features, ""];
    setContent({ ...content, packages: pkgs });
  }

  function updateFeature(pi: number, fi: number, val: string) {
    if (!content) return;
    const pkgs = [...content.packages];
    pkgs[pi].features[fi] = val;
    setContent({ ...content, packages: pkgs });
  }

  function removeFeature(pi: number, fi: number) {
    if (!content) return;
    const pkgs = [...content.packages];
    pkgs[pi].features = pkgs[pi].features.filter((_, i) => i !== fi);
    setContent({ ...content, packages: pkgs });
  }

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <div className="admin-header-logo">ZELINSKI PHOTO <span>/ Админка</span></div>
        <div className="admin-header-actions">
          <a href="/" target="_blank" className="admin-link">← Открыть сайт</a>
          <button onClick={logout} className="admin-btn-ghost">Выйти</button>
        </div>
      </div>

      <div className="admin-tabs">
        {(["photos", "prices", "about"] as const).map(t => (
          <button key={t} className={`admin-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t === "photos" ? "Фотографии" : t === "prices" ? "Цены" : "About"}
          </button>
        ))}
      </div>

      <div className="admin-body">

        {tab === "photos" && (
          <div>
            <div
              className={`admin-dropzone ${uploading ? "uploading" : ""}`}
              onClick={() => !uploading && fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={onDropZone}
            >
              {uploading ? uploadProgress : (
                <>
                  <div className="admin-dropzone-icon">↑</div>
                  <div>Перетащите фото или нажмите для выбора</div>
                  <div className="admin-dropzone-sub">JPG, PNG, WEBP</div>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" multiple accept="image/*" style={{ display: "none" }}
              onChange={e => e.target.files && uploadFiles(e.target.files)} />

            <div className="admin-photos-hint">Перетащите карточки для изменения порядка в галерее</div>

            <div className="admin-grid">
              {images.map((src, i) => (
                <div
                  key={src}
                  className={`admin-photo-item ${dragOver === i ? "drag-over" : ""} ${dragging === i ? "dragging" : ""}`}
                  draggable
                  onDragStart={() => onDragStart(i)}
                  onDragEnter={() => onDragEnter(i)}
                  onDragEnd={onDragEnd}
                  onDragOver={e => e.preventDefault()}
                >
                  <img src={src} alt="" />
                  <button className="admin-photo-delete" onClick={() => deleteImage(src)}>✕</button>
                  <div className="admin-photo-num">{i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "prices" && content && (
          <div className="admin-content-wrap">
            {content.packages.map((pkg, pi) => (
              <div key={pi} className="admin-card">
                <div className="admin-card-title">Пакет {pi + 1}</div>
                <div className="admin-field">
                  <label>Название</label>
                  <input value={pkg.name} onChange={e => updatePackage(pi, "name", e.target.value)} />
                </div>
                <div className="admin-field">
                  <label>Цена</label>
                  <input value={pkg.price} onChange={e => updatePackage(pi, "price", e.target.value)} />
                </div>
                <div className="admin-field">
                  <label>Что включено</label>
                  {pkg.features.map((f, fi) => (
                    <div key={fi} className="admin-feature-row">
                      <input value={f} onChange={e => updateFeature(pi, fi, e.target.value)} />
                      <button className="admin-btn-icon" onClick={() => removeFeature(pi, fi)}>✕</button>
                    </div>
                  ))}
                  <button className="admin-btn-ghost admin-btn-sm" onClick={() => addFeature(pi)}>+ Добавить пункт</button>
                </div>
                <div className="admin-field">
                  <label>Примечание</label>
                  <input value={pkg.note} onChange={e => updatePackage(pi, "note", e.target.value)} />
                </div>
              </div>
            ))}
            <button className="admin-btn-primary" onClick={saveContent} disabled={saving}>
              {saving ? "Сохранение..." : saved ? "Сохранено ✓" : "Сохранить"}
            </button>
          </div>
        )}

        {tab === "about" && content && (
          <div className="admin-content-wrap">
            <div className="admin-card">
              <div className="admin-card-title">Текст на странице About</div>
              <div className="admin-field">
                <textarea rows={10} value={content.about}
                  onChange={e => setContent({ ...content, about: e.target.value })} />
              </div>
            </div>
            <button className="admin-btn-primary" onClick={saveContent} disabled={saving}>
              {saving ? "Сохранение..." : saved ? "Сохранено ✓" : "Сохранить"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
