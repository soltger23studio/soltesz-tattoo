"use client";

import { MapPin, Clock, Star } from "lucide-react";

export default function About() {
  return (
    <section
      id="rolam"
      style={{
        padding: "120px 24px",
        background: "#0a0a0a",
        position: "relative",
      }}
    >
      {/* Section label */}
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#e31c5f",
          marginBottom: "16px",
        }}>
          01 — Rólam
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}
          className="grid-cols-1 md:grid-cols-2">

          {/* Left: text */}
          <div>
            <h2 style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: "24px",
              letterSpacing: "-0.02em",
            }}>
              A tinta mögötti<br />
              <span style={{ color: "#e31c5f" }}>ember</span>
            </h2>

            <p style={{ color: "#888", lineHeight: 1.8, marginBottom: "20px", fontSize: "16px" }}>
              Soltész József vagyok, Nyíregyháza tetoválóművésze. Évek óta alkotok egyedi,
              személyre szabott tetoválásokat — legyen szó anime stílusú részletekről,
              tradicionális japán mintákról vagy teljesen egyedi design-okról.
            </p>

            <p style={{ color: "#888", lineHeight: 1.8, marginBottom: "40px", fontSize: "16px" }}>
              Minden tetoválás egyedi történet. Az én feladatom, hogy a te elképzelésed
              örökre a bőrödre kerüljön — pontosan úgy, ahogy megálmodtad. A részletekre
              való odafigyelés és a precizitás a munkám alappillére.
            </p>

            {/* Info cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: <MapPin size={16} />, text: "Nyíregyháza, Magyarország" },
                { icon: <Clock size={16} />, text: "Foglalás üzenetben — TikTok & Instagram" },
                { icon: <Star size={16} />, text: "Anime · Japanese · Custom Design" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "#888",
                  fontSize: "14px",
                }}>
                  <span style={{ color: "#e31c5f" }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: photo placeholder + detail cards */}
          <div>
            {/* Profile photo placeholder */}
            <div style={{
              width: "100%",
              aspectRatio: "3/4",
              background: "#111",
              border: "1px solid #1f1f1f",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              color: "#333",
              marginBottom: "24px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at center, rgba(227,28,95,0.05) 0%, transparent 70%)",
              }} />
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              <span style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Fotó hamarosan
              </span>
            </div>

            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { num: "5+", label: "Év tapasztalat" },
                { num: "500+", label: "Elkészült tetoválás" },
                { num: "3", label: "Stílus kategória" },
                { num: "100%", label: "Egyedi munkák" },
              ].map((s) => (
                <div key={s.label} style={{
                  background: "#111",
                  border: "1px solid #1f1f1f",
                  borderRadius: "8px",
                  padding: "20px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#e31c5f" }}>{s.num}</div>
                  <div style={{ fontSize: "11px", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #rolam .md\\:grid-cols-2 {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
