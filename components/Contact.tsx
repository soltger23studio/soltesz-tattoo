"use client";

import { MapPin, Music2, Mail } from "lucide-react";

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

const contacts = [
  {
    icon: <InstagramIcon size={24} />,
    platform: "Instagram",
    handle: "@jozsef.soltesz",
    url: "https://www.instagram.com/jozsef.soltesz",
    desc: "Portfólió & üzenet foglaláshoz",
  },
  {
    icon: <Music2 size={24} />,
    platform: "TikTok",
    handle: "@soltesz.j_tattoo",
    url: "https://www.tiktok.com/@soltesz.j_tattoo",
    desc: "Videók, munkák menet közben",
  },
  {
    icon: <MapPin size={24} />,
    platform: "Helyszín",
    handle: "Nyíregyháza",
    url: "https://maps.google.com/?q=Nyíregyháza",
    desc: "Magyarország, Szabolcs-Szatmár-Bereg",
  },
];

export default function Contact() {
  return (
    <section id="kapcsolat" style={{ padding: "120px 24px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#e31c5f",
          marginBottom: "16px",
        }}>
          05 — Kapcsolat
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
            Lépj kapcsolatba<br />
            <span style={{ color: "#e31c5f" }}>velem</span>
          </h2>
          <p style={{ color: "#666", fontSize: "14px", maxWidth: "320px", lineHeight: 1.7 }}>
            Írj üzenetet bármely platformon — általában 24 órán belül válaszolok.
          </p>
        </div>

        {/* Contact cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "64px" }}
          className="contact-grid">
          {contacts.map((c) => (
            <a
              key={c.platform}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "#0f0f0f",
                border: "1px solid #1a1a1a",
                borderRadius: "12px",
                padding: "32px",
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#e31c5f";
                (e.currentTarget as HTMLElement).style.background = "#111";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a";
                (e.currentTarget as HTMLElement).style.background = "#0f0f0f";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                background: "rgba(227,28,95,0.1)",
                border: "1px solid rgba(227,28,95,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e31c5f",
                marginBottom: "20px",
              }}>
                {c.icon}
              </div>
              <div style={{ fontSize: "11px", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                {c.platform}
              </div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                {c.handle}
              </div>
              <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.5 }}>
                {c.desc}
              </div>
            </a>
          ))}
        </div>

        {/* CTA Banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(227,28,95,0.15) 0%, rgba(227,28,95,0.05) 100%)",
          border: "1px solid rgba(227,28,95,0.2)",
          borderRadius: "16px",
          padding: "56px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, rgba(227,28,95,0.1) 0%, transparent 70%)",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{
              fontSize: "clamp(24px, 4vw, 40px)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "16px",
              letterSpacing: "-0.01em",
            }}>
              Kész vagy az egyedi tetoválásodra?
            </h3>
            <p style={{ color: "#888", marginBottom: "32px", fontSize: "15px", maxWidth: "480px", margin: "0 auto 32px" }}>
              Ne halogasd tovább — írj üzenetet és kezdjük el az álomtetoválásod tervezését.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => document.querySelector("#foglalas")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: "#e31c5f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "16px 36px",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#c0184f")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#e31c5f")}
              >
                Időpontfoglalás
              </button>
              <a
                href="https://www.instagram.com/jozsef.soltesz"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid #333",
                  borderRadius: "6px",
                  padding: "16px 28px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#e31c5f";
                  e.currentTarget.style.color = "#e31c5f";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#333";
                  e.currentTarget.style.color = "#fff";
                }}
              >
                <Mail size={16} />
                Instagram üzenet
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
