"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Rólam", href: "#rolam" },
  { label: "Portfólió", href: "#portfolio" },
  { label: "Galéria", href: "#galeria" },
  { label: "Foglalás", href: "#foglalas" },
  { label: "Kapcsolat", href: "#kapcsolat" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1f1f1f" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ textDecoration: "none" }}
        >
          <span style={{ fontSize: "20px", fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>
            SOLTÉSZ<span style={{ color: "#e31c5f" }}>.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul style={{ display: "flex", gap: "32px", listStyle: "none", margin: 0, padding: 0 }}
          className="hidden md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleNav(item.href)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ccc",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                  padding: "4px 0",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e31c5f")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={() => handleNav("#foglalas")}
          className="hidden md:block"
          style={{
            background: "#e31c5f",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            fontSize: "13px",
            fontWeight: 600,
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

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "4px" }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "rgba(10,10,10,0.98)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid #1f1f1f",
            padding: "16px 24px 24px",
          }}
          className="md:hidden"
        >
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              style={{
                display: "block",
                width: "100%",
                background: "none",
                border: "none",
                color: "#ccc",
                fontSize: "16px",
                fontWeight: 500,
                cursor: "pointer",
                textAlign: "left",
                padding: "12px 0",
                borderBottom: "1px solid #1f1f1f",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#foglalas")}
            style={{
              display: "block",
              width: "100%",
              marginTop: "16px",
              background: "#e31c5f",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "14px",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Időpontfoglalás
          </button>
        </div>
      )}
    </header>
  );
}
