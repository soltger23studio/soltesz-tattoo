"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, ZoomIn } from "lucide-react";

interface GalleryItem {
  id: string;
  src: string;
  name: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const newItems: GalleryItem[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const src = URL.createObjectURL(file);
      newItems.push({ id: `${Date.now()}-${file.name}`, src, name: file.name });
    });
    setImages((prev) => [...prev, ...newItems]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const placeholderCount = Math.max(0, 6 - images.length);

  return (
    <section
      id="galeria"
      style={{ padding: "120px 24px", background: "#0a0a0a" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#e31c5f",
          marginBottom: "16px",
        }}>
          03 — Galéria
        </p>

        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "48px",
          gap: "24px",
          flexWrap: "wrap",
        }}>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}>
            Munkáim
          </h2>

          <button
            onClick={() => inputRef.current?.click()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "1px solid #e31c5f",
              color: "#e31c5f",
              borderRadius: "6px",
              padding: "10px 20px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e31c5f";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#e31c5f";
            }}
          >
            <Upload size={16} />
            Képek feltöltése
          </button>
        </div>

        {/* Drop zone (visible when no images) */}
        {images.length === 0 && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            style={{
              border: `2px dashed ${dragging ? "#e31c5f" : "#2a2a2a"}`,
              borderRadius: "12px",
              padding: "80px 24px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              background: dragging ? "rgba(227,28,95,0.04)" : "transparent",
              marginBottom: "40px",
            }}
          >
            <Upload size={40} color="#333" style={{ margin: "0 auto 16px" }} />
            <p style={{ color: "#555", fontSize: "16px", marginBottom: "8px" }}>
              Húzd ide a képeket, vagy kattints a feltöltéshez
            </p>
            <p style={{ color: "#333", fontSize: "13px" }}>PNG, JPG, WEBP — max. 10MB/kép</p>
          </div>
        )}

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }} className="gallery-grid">
          {/* Uploaded images */}
          {images.map((img) => (
            <div
              key={img.id}
              style={{
                position: "relative",
                aspectRatio: "1",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#111",
                cursor: "pointer",
              }}
              onClick={() => setLightbox(img)}
            >
              <Image src={img.src} alt={img.name} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 33vw" />
              {/* Overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
              >
                <ZoomIn size={28} color="#fff" />
              </div>
              {/* Remove button */}
              <button
                onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "rgba(0,0,0,0.7)",
                  border: "none",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#fff",
                  zIndex: 2,
                }}
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {/* Placeholder slots */}
          {images.length > 0 && Array.from({ length: placeholderCount }).map((_, i) => (
            <div
              key={`ph-${i}`}
              onClick={() => inputRef.current?.click()}
              style={{
                aspectRatio: "1",
                borderRadius: "8px",
                border: "1px dashed #1f1f1f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#e31c5f")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1f1f1f")}
            >
              <Upload size={20} color="#333" />
            </div>
          ))}
        </div>

        {images.length > 0 && (
          <p style={{ textAlign: "center", color: "#444", fontSize: "13px", marginTop: "24px" }}>
            {images.length} kép feltöltve — kattints a galériára az újabb képek hozzáadásához
          </p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            <X size={20} />
          </button>
          <div
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              width: "800px",
              height: "600px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.name}
              fill
              style={{ objectFit: "contain", borderRadius: "8px" }}
            />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
