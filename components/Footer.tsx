"use client";

import { Music2 } from "lucide-react";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "#050505",
      borderTop: "1px solid #111",
      padding: "40px 24px",
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <span style={{ fontWeight: 700, fontSize: "16px", color: "#fff", letterSpacing: "0.05em" }}>
          SOLTÉSZ<span style={{ color: "#e31c5f" }}>.</span>
        </span>

        <p style={{ color: "#444", fontSize: "13px" }}>
          © {year} Soltész József · Nyíregyháza · Minden jog fenntartva.
        </p>

        <div style={{ display: "flex", gap: "16px" }}>
          <a
            href="https://www.instagram.com/jozsef.soltesz"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#555", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e31c5f")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >
            <InstagramIcon size={20} />
          </a>
          <a
            href="https://www.tiktok.com/@soltesz.j_tattoo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#555", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e31c5f")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >
            <Music2 size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
