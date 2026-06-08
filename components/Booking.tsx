"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const inputStyle = {
  width: "100%",
  background: "#0f0f0f",
  border: "1px solid #1f1f1f",
  borderRadius: "6px",
  padding: "14px 16px",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    style: "",
    placement: "",
    size: "",
    description: "",
    reference: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getStyle = (name: string) => ({
    ...inputStyle,
    borderColor: focused === name ? "#e31c5f" : "#1f1f1f",
  });

  if (submitted) {
    return (
      <section id="foglalas" style={{ padding: "120px 24px", background: "#080808" }}>
        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(227,28,95,0.1)",
            border: "1px solid rgba(227,28,95,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <CheckCircle size={36} color="#e31c5f" />
          </div>
          <h2 style={{ fontSize: "36px", fontWeight: 800, color: "#fff" }}>Kérelem elküldve!</h2>
          <p style={{ color: "#888", lineHeight: 1.7 }}>
            Köszönjük az érdeklődést! Hamarosan felveszem veled a kapcsolatot az
            időpont részleteivel. Türelmedet köszönöm!
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name:"",email:"",phone:"",style:"",placement:"",size:"",description:"",reference:"" }); }}
            style={{
              background: "#e31c5f",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "12px 28px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Új kérelem
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="foglalas" style={{ padding: "120px 24px", background: "#080808" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#e31c5f",
          marginBottom: "16px",
        }}>
          04 — Foglalás
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}
          className="booking-grid">
          {/* Left */}
          <div>
            <h2 style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}>
              Foglalj<br />
              <span style={{ color: "#e31c5f" }}>időpontot</span>
            </h2>
            <p style={{ color: "#888", lineHeight: 1.8, marginBottom: "40px", fontSize: "15px" }}>
              Töltsd ki az alábbi űrlapot a tetoválásod részleteivel, és én visszajelzek
              az elérhető időpontokkal. Az árat és a pontos részleteket egyénileg
              egyeztetjük.
            </p>

            {/* Info boxes */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  title: "Hogyan zajlik?",
                  body: "Az üzenetváltás után egyeztetünk az időpontról, a dizájnról és az árról. Előleg szükséges a foglalás megerősítéséhez.",
                },
                {
                  title: "Mikor érhető el?",
                  body: "Foglalás TikTok és Instagram üzenetben is lehetséges — @soltesz.j_tattoo | @jozsef.soltesz",
                },
                {
                  title: "Ingyenes konzultáció",
                  body: "Az első megbeszélés ingyenes. Hozz referencia képeket, hogy pontosan megértsem az elképzelésed.",
                },
              ].map((info) => (
                <div key={info.title} style={{
                  background: "#0f0f0f",
                  border: "1px solid #1a1a1a",
                  borderRadius: "8px",
                  padding: "20px 24px",
                }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                    {info.title}
                  </div>
                  <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}>{info.body}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "#888", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Neved *
                </label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  placeholder="Kovács Péter"
                  style={getStyle("name")}
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#888", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Telefonszám *
                </label>
                <input
                  required
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                  placeholder="+36 30 123 4567"
                  style={getStyle("phone")}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "12px", color: "#888", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                E-mail cím
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="pelda@email.com"
                style={getStyle("email")}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "#888", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Stílus *
                </label>
                <select
                  required
                  name="style"
                  value={form.style}
                  onChange={handleChange}
                  onFocus={() => setFocused("style")}
                  onBlur={() => setFocused(null)}
                  style={{ ...getStyle("style"), appearance: "none" }}
                >
                  <option value="">Válassz...</option>
                  <option value="anime">Anime</option>
                  <option value="japanese">Japanese</option>
                  <option value="custom">Custom Design</option>
                  <option value="other">Egyéb</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#888", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Méret
                </label>
                <select
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  onFocus={() => setFocused("size")}
                  onBlur={() => setFocused(null)}
                  style={{ ...getStyle("size"), appearance: "none" }}
                >
                  <option value="">Válassz...</option>
                  <option value="small">Kis (5-10cm)</option>
                  <option value="medium">Közepes (10-20cm)</option>
                  <option value="large">Nagy (20cm+)</option>
                  <option value="sleeve">Sleeve / teljes kar</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: "12px", color: "#888", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Tetoválás helye a testen
              </label>
              <input
                name="placement"
                value={form.placement}
                onChange={handleChange}
                onFocus={() => setFocused("placement")}
                onBlur={() => setFocused(null)}
                placeholder="pl. jobb alkar, bal váll..."
                style={getStyle("placement")}
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", color: "#888", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Elképzelés leírása *
              </label>
              <textarea
                required
                name="description"
                value={form.description}
                onChange={handleChange}
                onFocus={() => setFocused("description")}
                onBlur={() => setFocused(null)}
                rows={4}
                placeholder="Írd le minél részletesebben, mit szeretnél..."
                style={{ ...getStyle("description"), resize: "vertical" }}
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", color: "#888", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Referencia kép link (opcionális)
              </label>
              <input
                name="reference"
                value={form.reference}
                onChange={handleChange}
                onFocus={() => setFocused("reference")}
                onBlur={() => setFocused(null)}
                placeholder="Instagram, Pinterest link..."
                style={getStyle("reference")}
              />
            </div>

            <button
              type="submit"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                background: "#e31c5f",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "16px",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                cursor: "pointer",
                marginTop: "8px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#c0184f")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#e31c5f")}
            >
              <Send size={16} />
              Kérelem elküldése
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .booking-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
