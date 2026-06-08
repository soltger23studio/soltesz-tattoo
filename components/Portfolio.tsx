"use client";

import { useState } from "react";

const styles = [
  {
    id: "anime",
    title: "Anime",
    description:
      "Manga és anime karakterek részletgazdag, fekete-szürke megvalósítása. Erős vonalak, precíz árnyékolás, karakterhű kivitelezés.",
    tags: ["Fekete-szürke", "Részletgazdag", "Karakteres"],
    count: "2+ alkotás",
    gradient: "linear-gradient(135deg, rgba(227,28,95,0.15) 0%, rgba(227,28,95,0.03) 100%)",
  },
  {
    id: "japanese",
    title: "Japanese",
    description:
      "Tradicionális japán elemek — koi halak, sakura, hullámok, sárkányok — modern precizitással ötvözve. Időtálló stílus, erőteljes megjelenés.",
    tags: ["Tradicionális", "Erőteljes", "Szimbolikus"],
    count: "5+ alkotás",
    gradient: "linear-gradient(135deg, rgba(227,28,95,0.15) 0%, rgba(227,28,95,0.03) 100%)",
  },
  {
    id: "design",
    title: "Custom Design",
    description:
      "Teljesen egyedi, személyre szabott tervek. Az elképzelésedből valóságot alkotok — nincs két egyforma tetoválás.",
    tags: ["Egyedi", "Személyre szabott", "Kreatív"],
    count: "100+ alkotás",
    gradient: "linear-gradient(135deg, rgba(227,28,95,0.15) 0%, rgba(227,28,95,0.03) 100%)",
  },
];

export default function Portfolio() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="portfolio"
      style={{
        padding: "120px 24px",
        background: "#080808",
        position: "relative",
      }}
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
          02 — Portfólió
        </p>

        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "64px",
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
            Munkastílusok
          </h2>
          <p style={{ color: "#666", fontSize: "14px", maxWidth: "320px", lineHeight: 1.7 }}>
            Minden stílusban egyedi minőséget nyújtok. Válaszd ki, mi illik hozzád.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
          className="portfolio-grid">
          {styles.map((s, i) => (
            <div
              key={s.id}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === s.id ? "#141414" : "#0f0f0f",
                border: `1px solid ${hovered === s.id ? "#e31c5f" : "#1a1a1a"}`,
                borderRadius: "12px",
                padding: "40px 32px",
                cursor: "default",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background gradient on hover */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: s.gradient,
                opacity: hovered === s.id ? 1 : 0,
                transition: "opacity 0.3s",
              }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Number */}
                <div style={{
                  fontSize: "48px",
                  fontWeight: 800,
                  color: hovered === s.id ? "rgba(227,28,95,0.3)" : "rgba(255,255,255,0.05)",
                  lineHeight: 1,
                  marginBottom: "24px",
                  transition: "color 0.3s",
                }}>
                  0{i + 1}
                </div>

                <h3 style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "16px",
                  letterSpacing: "-0.01em",
                }}>
                  {s.title}
                </h3>

                <p style={{
                  color: "#666",
                  lineHeight: 1.7,
                  fontSize: "14px",
                  marginBottom: "24px",
                }}>
                  {s.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                  {s.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "#e31c5f",
                      background: "rgba(227,28,95,0.1)",
                      border: "1px solid rgba(227,28,95,0.2)",
                      borderRadius: "4px",
                      padding: "4px 10px",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{
                  fontSize: "12px",
                  color: "#555",
                  borderTop: "1px solid #1f1f1f",
                  paddingTop: "16px",
                  letterSpacing: "0.05em",
                }}>
                  {s.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
