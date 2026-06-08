"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import JapaneseBackground from "./JapaneseBackground";

/* ─── tokens ─── */
const RED      = "rgba(210,20,20,1)";
const RED_DIM  = "rgba(210,20,20,0.18)";
const RED_GLOW = "rgba(210,20,20,0.35)";
const FBEBAS   = "var(--font-bebas),'Bebas Neue',sans-serif";
const FINTER   = "var(--font-inter),'Inter',sans-serif";

/* ─── haptic ─── */
const haptic = (ms = 8) => {
  if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(ms);
};

/* ─── tab definitions ─── */
const TABS = [
  {
    id: "rolam", label: "Rólam",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: "portfolio", label: "Portfólió",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7h18v14H3zM3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    id: "arlista", label: "Árlista",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01" />
      </svg>
    ),
  },
  {
    id: "foglalas", label: "Foglalás",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h18v18H3zM16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    id: "kapcsolat", label: "Kapcsolat",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

/* ══════════════════════ PANEL CONTENT ══════════════════════ */

function MobileVideoSection() {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { v.play().then(() => setPlaying(true)).catch(() => {}); }
      else { v.pause(); setPlaying(false); }
    }, { threshold: 0.2 });
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ marginBottom: "28px" }}>
      {/* Label row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "24px", height: "1px", background: "rgba(210,20,20,0.6)" }} />
          <span style={{ fontSize: "9px", letterSpacing: "0.32em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontFamily: FINTER }}>Munkamenet</span>
        </div>
        {playing && (
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: RED, animation: "pulseDot 1.2s ease-in-out infinite" }} />
            <span style={{ fontSize: "8px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", fontFamily: FINTER }}>LIVE</span>
          </div>
        )}
      </div>

      {/* Video frame */}
      <div style={{ position: "relative", borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(210,20,20,0.3)", boxShadow: "0 0 0 1px rgba(210,20,20,0.08), 0 24px 60px rgba(0,0,0,0.7), 0 0 50px rgba(210,20,20,0.1)" }}>

        {/* Ambient glow */}
        <div style={{ position: "absolute", inset: "-20px", background: "radial-gradient(ellipse at center, rgba(210,20,20,0.15) 0%, transparent 65%)", borderRadius: "30px", pointerEvents: "none", zIndex: 0 }} />

        {/* Corner accents */}
        <div style={{ position:"absolute",top:"12px",left:"12px",width:"16px",height:"16px",borderTop:"1.5px solid rgba(210,20,20,0.9)",borderLeft:"1.5px solid rgba(210,20,20,0.9)",zIndex:4,borderRadius:"2px 0 0 0" }} />
        <div style={{ position:"absolute",top:"12px",right:"12px",width:"16px",height:"16px",borderTop:"1.5px solid rgba(210,20,20,0.9)",borderRight:"1.5px solid rgba(210,20,20,0.9)",zIndex:4,borderRadius:"0 2px 0 0" }} />
        <div style={{ position:"absolute",bottom:"12px",left:"12px",width:"16px",height:"16px",borderBottom:"1.5px solid rgba(210,20,20,0.9)",borderLeft:"1.5px solid rgba(210,20,20,0.9)",zIndex:4,borderRadius:"0 0 0 2px" }} />
        <div style={{ position:"absolute",bottom:"12px",right:"12px",width:"16px",height:"16px",borderBottom:"1.5px solid rgba(210,20,20,0.9)",borderRight:"1.5px solid rgba(210,20,20,0.9)",zIndex:4,borderRadius:"0 0 2px 0" }} />

        {/* Video */}
        <div style={{ position: "relative", aspectRatio: "9/16", background: "#000" }}>
          <video
            ref={vidRef}
            src="/process.mp4"
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Top gradient */}
          <div style={{ position:"absolute",top:0,left:0,right:0,height:"20%",background:"linear-gradient(to bottom,rgba(0,0,0,0.7),transparent)",pointerEvents:"none",zIndex:2 }} />
          {/* Bottom gradient + text */}
          <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"42%",background:"linear-gradient(to top,rgba(0,0,0,0.95),transparent)",pointerEvents:"none",zIndex:2 }} />
          <div style={{ position:"absolute",bottom:"20px",left:"20px",right:"20px",zIndex:3 }}>
            <p style={{ fontFamily:FBEBAS,fontSize:"32px",letterSpacing:"0.06em",color:"#fff",lineHeight:1.0,margin:0,textShadow:"0 2px 24px rgba(0,0,0,0.9)" }}>
              TRUST THE<br /><span style={{ color:RED }}>PROCESS</span>
            </p>
            <p style={{ fontSize:"10px",color:"rgba(255,255,255,0.35)",marginTop:"6px",fontFamily:FINTER,letterSpacing:"0.1em" }}>
              Tervezéstől a tűig
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelRolam() {
  return (
    <div style={{ fontFamily: FINTER }}>
      <p style={{ fontSize: "11px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "6px" }}>01 — Rólam</p>
      <h2 style={{ fontSize: "38px", fontWeight: 400, color: "#fff", lineHeight: 1.0, letterSpacing: "0.04em", fontFamily: FBEBAS, marginBottom: "22px" }}>
        A tinta<br /><span style={{ color: RED }}>mögött</span>
      </h2>

      {/* ── Premium video section ── */}
      <MobileVideoSection />

      <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "10px" }}>
        Soltész József vagyok, Nyíregyháza tetoválóművésze. Anime, japán és custom design stílusban alkotok egyedi, személyre szabott tetoválásokat.
      </p>
      <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "24px" }}>
        Minden tetoválás egyedi történet — precizitás, részletgazdagság, és az elképzelésed tökéletes megvalósítása.
      </p>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px", marginBottom: "20px" }}>
        {[{ v: "5+", l: "Év" }, { v: "500+", l: "Tető." }, { v: "4", l: "Ország" }, { v: "100%", l: "Egyedi" }].map(s => (
          <div key={s.l} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "14px 8px", textAlign: "center" }}>
            <div style={{ fontSize: "20px", fontWeight: 700, color: RED, marginBottom: "3px" }}>{s.v}</div>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* International */}
      <div style={{ background: "rgba(210,20,20,0.07)", border: "1px solid rgba(210,20,20,0.22)", borderRadius: "14px", padding: "16px", marginBottom: "20px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.22em", color: RED, textTransform: "uppercase", marginBottom: "12px" }}>🌍 Külföldi tapasztalat</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {[{ flag: "🇧🇪", c: "Belgium" }, { flag: "🇩🇪", c: "Németország" }, { flag: "🇬🇧", c: "Anglia" }, { flag: "🇦🇺", c: "Ausztrália" }].map(({ flag, c }) => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
              <span style={{ fontSize: "20px" }}>{flag}</span>{c}
            </div>
          ))}
        </div>
      </div>

      {/* Info pills */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {["📍 Nyíregyháza, Magyarország", "💬 Foglalás: TikTok & Instagram", "🎨 Anime · Japanese · Custom"].map((t, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "12px 14px", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

function PanelPortfolio() {
  const styles = [
    { n: "Anime", d: "Manga karakterek részletgazdag, fekete-szürke megvalósítása.", tags: ["Fekete-szürke", "Részletgazdag"], c: "2+ alkotás", emoji: "⛩️" },
    { n: "Japanese", d: "Tradicionális japán elemek modern precizitással ötvözve.", tags: ["Tradicionális", "Erőteljes"], c: "5+ alkotás", emoji: "🐉" },
    { n: "Custom Design", d: "Teljesen egyedi, személyre szabott tervek — nincs két egyforma.", tags: ["Egyedi", "Kreatív"], c: "100+ alkotás", emoji: "✏️" },
  ];
  return (
    <div style={{ fontFamily: FINTER }}>
      <p style={{ fontSize: "11px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "6px" }}>02 — Portfólió</p>
      <h2 style={{ fontSize: "38px", fontWeight: 400, color: "#fff", lineHeight: 1.0, letterSpacing: "0.04em", fontFamily: FBEBAS, marginBottom: "24px" }}>Munkastílusok</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {styles.map((s, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "20px", activeOpacity: 0.8 } as React.CSSProperties}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
              <span style={{ fontSize: "28px" }}>{s.emoji}</span>
              <div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{s.n}</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", marginTop: "2px" }}>{s.c}</div>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: "12px" }}>{s.d}</p>
            <div style={{ display: "flex", gap: "6px" }}>
              {s.tags.map(t => (
                <span key={t} style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: RED, background: RED_DIM, border: "1px solid rgba(210,20,20,0.25)", borderRadius: "6px", padding: "4px 10px" }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px", background: "rgba(210,20,20,0.07)", border: "1px solid rgba(210,20,20,0.2)", borderRadius: "14px", padding: "16px", textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "2px" }}>Nézd meg a munkáimat élőben</p>
        <a href="https://www.instagram.com/jozsef.soltesz_tattoo/" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", color: RED, fontSize: "14px", fontWeight: 700, textDecoration: "none", marginTop: "8px" }}>
          Instagram → @jozsef.soltesz_tattoo
        </a>
      </div>
    </div>
  );
}

function PanelArlista({ onBook }: { onBook: () => void }) {
  const row = (label: string, val: string, sub?: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div>
        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>{label}</div>
        {sub && <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", marginTop: "2px" }}>{sub}</div>}
      </div>
      <div style={{ fontSize: "15px", fontWeight: 700, color: RED, whiteSpace: "nowrap", marginLeft: "12px" }}>{val}</div>
    </div>
  );

  return (
    <div style={{ fontFamily: FINTER }}>
      <p style={{ fontSize: "11px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "6px" }}>03 — Árlista</p>
      <h2 style={{ fontSize: "38px", fontWeight: 400, color: "#fff", lineHeight: 1.0, letterSpacing: "0.04em", fontFamily: FBEBAS, marginBottom: "20px" }}>
        Árak &amp; <span style={{ color: RED }}>Feltételek</span>
      </h2>

      {/* Hero price card */}
      <div style={{ background: "linear-gradient(135deg, rgba(210,20,20,0.15) 0%, rgba(210,20,20,0.06) 100%)", border: "1px solid rgba(210,20,20,0.35)", borderRadius: "18px", padding: "24px", marginBottom: "20px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>Napi díj</p>
        <div style={{ fontSize: "56px", fontWeight: 400, color: "#fff", fontFamily: FBEBAS, letterSpacing: "0.06em", lineHeight: 1 }}>
          60 000 <span style={{ color: RED }}>Ft</span>
        </div>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "8px" }}>/ munkanap · kb. 6–8 óra</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        {row("Kis tetoválás", "15 000 – 25 000 Ft", "kb. 1–2 óra")}
        {row("Közepes tetoválás", "25 000 – 45 000 Ft", "kb. 2–4 óra")}
        {row("Nagy munka / fél nap", "30 000 – 50 000 Ft", "kb. 4–6 óra")}
        {row("Egész napos ülés", "60 000 Ft", "kb. 6–8 óra")}
        {row("Fedés (cover-up)", "Egyéni árajánlat", "konzultáció szükséges")}
      </div>

      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "14px", marginBottom: "24px" }}>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", lineHeight: 1.85 }}>
          📍 Az árak tájékoztató jellegűek.<br />
          📌 Foglaláshoz 5 000 Ft foglaló szükséges, ami beleszámít az árba.<br />
          📌 Ingyenes konzultáció minden munkához.
        </p>
      </div>

      <button onClick={() => { haptic(12); onBook(); }}
        style={{ width: "100%", background: RED, border: "none", color: "#fff", borderRadius: "14px", padding: "17px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: FINTER, boxShadow: `0 8px 24px ${RED_GLOW}` }}>
        Foglalj időpontot →
      </button>
    </div>
  );
}

function PanelFoglalas() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", style: "", desc: "" });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const inp: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "12px",
    padding: "15px",
    color: "#fff",
    fontSize: "16px", // prevents iOS zoom
    outline: "none",
    fontFamily: FINTER,
    WebkitAppearance: "none",
  };

  if (done) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "40px", fontFamily: FINTER, textAlign: "center" }}>
      <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: RED_DIM, border: "1px solid rgba(210,20,20,0.4)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
      </div>
      <h3 style={{ fontSize: "38px", fontWeight: 400, color: "#fff", marginBottom: "12px", fontFamily: FBEBAS, letterSpacing: "0.04em" }}>Elküldve!</h3>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: 1.7, marginBottom: "28px", maxWidth: "260px" }}>
        Hamarosan visszajelzek az elérhető időpontokkal. 🤙
      </p>
      <button onClick={() => { setDone(false); setForm({ name: "", phone: "", style: "", desc: "" }); }}
        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", borderRadius: "12px", padding: "13px 26px", fontSize: "13px", cursor: "pointer", fontFamily: FINTER }}>
        Új kérelem
      </button>
    </div>
  );

  return (
    <div style={{ fontFamily: FINTER }}>
      <p style={{ fontSize: "11px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "6px" }}>04 — Foglalás</p>
      <h2 style={{ fontSize: "38px", fontWeight: 400, color: "#fff", lineHeight: 1.0, letterSpacing: "0.04em", fontFamily: FBEBAS, marginBottom: "6px" }}>
        Foglalj<br /><span style={{ color: RED }}>időpontot</span>
      </h2>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: "24px" }}>Töltsd ki az adatokat és visszajelzek az időpontokkal.</p>

      <form onSubmit={e => { e.preventDefault(); haptic(20); setDone(true); }} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <label style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", marginBottom: "7px", textTransform: "uppercase" }}>Név *</label>
          <input required value={form.name} onChange={e => set("name", e.target.value)} placeholder="Kovács Péter" style={inp} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", marginBottom: "7px", textTransform: "uppercase" }}>Telefon *</label>
          <input required type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+36 30 000 0000" style={inp} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", marginBottom: "7px", textTransform: "uppercase" }}>Stílus *</label>
          <select required value={form.style} onChange={e => set("style", e.target.value)} style={{ ...inp, appearance: "none", WebkitAppearance: "none" }}>
            <option value="">Válassz stílust...</option>
            <option value="anime">Anime</option>
            <option value="japanese">Japanese</option>
            <option value="custom">Custom Design</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", marginBottom: "7px", textTransform: "uppercase" }}>Leírás *</label>
          <textarea required rows={4} value={form.desc} onChange={e => set("desc", e.target.value)} placeholder="Írd le az elképzelésed — méret, testrész, stílus..." style={{ ...inp, resize: "none" }} />
        </div>
        <button type="submit"
          style={{ width: "100%", background: RED, border: "none", color: "#fff", borderRadius: "14px", padding: "17px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: FINTER, boxShadow: `0 8px 24px ${RED_GLOW}`, marginTop: "4px" }}>
          Elküldés
        </button>
      </form>
    </div>
  );
}

function PanelKapcsolat() {
  const contacts = [
    { p: "Instagram", h: "@jozsef.soltesz_tattoo", d: "Portfólió & üzenetfoglalás", url: "https://www.instagram.com/jozsef.soltesz_tattoo/", icon: "📸" },
    { p: "TikTok", h: "@soltesz.j_tattoo", d: "Videók, munkák menet közben", url: "https://www.tiktok.com/@soltesz.j_tattoo", icon: "🎵" },
    { p: "Helyszín", h: "Nyíregyháza", d: "Sz-Sz-Bereg megye, Magyarország", url: "https://maps.google.com/?q=Nyíregyháza", icon: "📍" },
  ];

  return (
    <div style={{ fontFamily: FINTER }}>
      <p style={{ fontSize: "11px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "6px" }}>05 — Kapcsolat</p>
      <h2 style={{ fontSize: "38px", fontWeight: 400, color: "#fff", lineHeight: 1.0, letterSpacing: "0.04em", fontFamily: FBEBAS, marginBottom: "24px" }}>
        Lépj<br />kapcsolatba
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
        {contacts.map(c => (
          <a key={c.p} href={c.url} target="_blank" rel="noopener noreferrer"
            onClick={() => haptic(10)}
            style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "18px", textDecoration: "none", WebkitTapHighlightColor: "transparent" }}>
            <span style={{ fontSize: "28px", flexShrink: 0 }}>{c.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>{c.p}</div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>{c.h}</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{c.d}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
          </a>
        ))}
      </div>

      {/* CTA block */}
      <div style={{ background: "linear-gradient(135deg, rgba(210,20,20,0.15), rgba(210,20,20,0.05))", border: "1px solid rgba(210,20,20,0.25)", borderRadius: "18px", padding: "24px", textAlign: "center" }}>
        <p style={{ fontSize: "20px", marginBottom: "6px" }}>💉</p>
        <p style={{ fontSize: "16px", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>Kész az egyedi tetoválásodra?</p>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "18px" }}>Írj üzenetet Instagramon!</p>
        <a href="https://www.instagram.com/jozsef.soltesz_tattoo/" target="_blank" rel="noopener noreferrer"
          onClick={() => haptic(12)}
          style={{ display: "inline-block", background: RED, color: "#fff", borderRadius: "12px", padding: "14px 28px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", boxShadow: `0 6px 20px ${RED_GLOW}` }}>
          Üzenet küldése →
        </a>
      </div>
    </div>
  );
}

/* ══════════════════════ BOTTOM SHEET ══════════════════════ */

function BottomSheet({ activeTab, onBook, onClose }: {
  activeTab: string | null;
  onBook: () => void;
  onClose: () => void;
}) {
  const sheetRef  = useRef<HTMLDivElement>(null);
  const startY    = useRef(0);
  const currentY  = useRef(0);
  const dragging  = useRef(false);

  const isOpen = activeTab !== null;

  /* drag-to-dismiss */
  const onTouchStart = (e: React.TouchEvent) => {
    startY.current   = e.touches[0].clientY;
    currentY.current = 0;
    dragging.current = true;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current || !sheetRef.current) return;
    const dy = e.touches[0].clientY - startY.current;
    if (dy > 0) {
      currentY.current = dy;
      sheetRef.current.style.transform = `translateY(${dy}px)`;
      sheetRef.current.style.transition = "none";
    }
  };
  const onTouchEnd = () => {
    dragging.current = false;
    if (!sheetRef.current) return;
    sheetRef.current.style.transition = "transform 0.35s cubic-bezier(0.32,0.72,0,1)";
    if (currentY.current > 120) {
      haptic(8);
      onClose();
    } else {
      sheetRef.current.style.transform = "translateY(0)";
    }
  };

  /* reset transform when sheet opens */
  useEffect(() => {
    if (isOpen && sheetRef.current) {
      sheetRef.current.style.transform = "translateY(0)";
      sheetRef.current.style.transition = "transform 0.45s cubic-bezier(0.32,0.72,0,1)";
    }
  }, [isOpen, activeTab]);

  const content: Record<string, React.ReactNode> = {
    rolam:     <PanelRolam />,
    portfolio: <PanelPortfolio />,
    arlista:   <PanelArlista onBook={onBook} />,
    foglalas:  <PanelFoglalas />,
    kapcsolat: <PanelKapcsolat />,
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => { haptic(6); onClose(); }}
        style={{
          position: "fixed", inset: 0, zIndex: 40,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        style={{
          position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 50,
          background: "rgba(8,3,3,0.98)",
          borderTop: "1px solid rgba(210,20,20,0.15)",
          borderRadius: "24px 24px 0 0",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateY(0)" : "translateY(110%)",
          transition: "transform 0.45s cubic-bezier(0.32,0.72,0,1)",
          willChange: "transform",
        }}
      >
        {/* Drag handle */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ padding: "14px 0 6px", display: "flex", justifyContent: "center", cursor: "grab", flexShrink: 0 }}
        >
          <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.15)" }} />
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 24px 120px", WebkitOverflowScrolling: "touch" }}>
          {activeTab && content[activeTab]}
        </div>
      </div>
    </>
  );
}

/* ══════════════════════ HERO ══════════════════════ */

function Hero({ onTabOpen }: { onTabOpen: (id: string) => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", padding: "0 24px", textAlign: "center", zIndex: 5 }}>

      {/* Monogram */}
      <div style={{ position: "relative", marginBottom: "24px", opacity: mounted ? 1 : 0, transform: mounted ? "scale(1)" : "scale(0.85)", transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}>
        {/* glow rings */}
        <div style={{ position: "absolute", inset: "-28px", borderRadius: "50%", background: "radial-gradient(circle, rgba(210,20,20,0.2) 0%, transparent 70%)", animation: "pulseGlow 3.5s ease-in-out infinite" }} />
        <div style={{ position: "absolute", inset: "-14px", borderRadius: "50%", background: "radial-gradient(circle, rgba(210,20,20,0.28) 0%, transparent 65%)", animation: "pulseGlow 3.5s ease-in-out infinite 0.8s" }} />
        {/* ring */}
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(210,20,20,0.4)" }} />
        {/* monogram */}
        <div style={{ width: "96px", height: "96px", borderRadius: "50%", background: "rgba(210,20,20,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: FBEBAS, fontSize: "40px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.92)", textShadow: "0 0 20px rgba(210,20,20,0.7), 0 0 50px rgba(180,10,10,0.3)" }}>
            S.J.
          </span>
        </div>
      </div>

      {/* Name */}
      <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s cubic-bezier(0.4,0,0.2,1) 0.1s", marginBottom: "6px" }}>
        <h1 style={{ fontSize: "clamp(34px, 9vw, 46px)", fontWeight: 400, color: "#fff", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: FBEBAS, lineHeight: 1, margin: 0 }}>
          Soltész József
        </h1>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.3em", textTransform: "uppercase", marginTop: "8px", fontFamily: FINTER }}>
          Tetoválóművész · Nyíregyháza
        </p>
      </div>

      {/* Style tags */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginTop: "16px", marginBottom: "32px", opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 0.25s" }}>
        {["Anime", "Japanese", "Custom"].map(tag => (
          <span key={tag} style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: RED, background: RED_DIM, border: "1px solid rgba(210,20,20,0.3)", borderRadius: "20px", padding: "5px 12px" }}>{tag}</span>
        ))}
      </div>

      {/* Quick action buttons */}
      <div style={{ display: "flex", gap: "12px", width: "100%", maxWidth: "320px", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(12px)", transition: "all 0.5s ease 0.35s" }}>
        <button
          onClick={() => { haptic(12); onTabOpen("foglalas"); }}
          style={{ flex: 2, background: RED, border: "none", color: "#fff", borderRadius: "14px", padding: "16px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", fontFamily: FINTER, boxShadow: `0 8px 28px ${RED_GLOW}`, WebkitTapHighlightColor: "transparent" }}>
          Foglalás
        </button>
        <button
          onClick={() => { haptic(8); onTabOpen("portfolio"); }}
          style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: "14px", padding: "16px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: FINTER, WebkitTapHighlightColor: "transparent" }}>
          Munkák
        </button>
      </div>

      {/* Social proof */}
      <div style={{ marginTop: "24px", display: "flex", gap: "20px", opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 0.45s" }}>
        {[{ n: "500+", l: "Tetoválás" }, { n: "5+ év", l: "Tapasztalat" }, { n: "4 ország", l: "Külföldi" }].map(s => (
          <div key={s.l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{s.n}</div>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em", marginTop: "2px" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <p style={{ position: "absolute", bottom: "12px", left: 0, right: 0, textAlign: "center", fontSize: "10px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.15em", opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 0.6s" }}>
        ↑ NAVIGÁLJ LENTEBB
      </p>
    </div>
  );
}

/* ══════════════════════ BOTTOM TAB BAR ══════════════════════ */

function TabBar({ active, onSelect }: { active: string | null; onSelect: (id: string) => void }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 60,
      background: "rgba(6,2,2,0.95)",
      borderTop: "1px solid rgba(210,20,20,0.1)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      paddingBottom: "env(safe-area-inset-bottom)",
      display: "flex",
    }}>
      {TABS.map(tab => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => { haptic(10); onSelect(tab.id); }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              padding: "10px 4px 10px",
              background: "none",
              border: "none",
              color: isActive ? RED : "rgba(255,255,255,0.3)",
              cursor: "pointer",
              transition: "color 0.2s ease",
              WebkitTapHighlightColor: "transparent",
              minHeight: "56px",
            }}
          >
            <div style={{ transform: isActive ? "translateY(-2px) scale(1.1)" : "translateY(0) scale(1)", transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}>
              {tab.icon}
            </div>
            <span style={{ fontSize: "9px", fontWeight: isActive ? 700 : 400, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: FINTER }}>
              {tab.label}
            </span>
            {isActive && (
              <div style={{ position: "absolute", bottom: "calc(100% - 2px)", left: "50%", transform: "translateX(-50%)", width: "28px", height: "2px", borderRadius: "1px", background: RED }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ══════════════════════ MAIN EXPORT ══════════════════════ */

export default function MobilePage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const openTab = useCallback((id: string) => {
    setActiveTab(prev => prev === id ? null : id);
  }, []);

  const closeSheet = useCallback(() => setActiveTab(null), []);

  /* book from árlista → open foglalas */
  const goBook = useCallback(() => setActiveTab("foglalas"), []);

  /* lock body scroll when sheet open */
  useEffect(() => {
    document.body.style.overflow = activeTab ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeTab]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", fontFamily: FINTER }}>

      <JapaneseBackground />

      {/* vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, transparent 25%, rgba(0,0,0,0.45) 65%, #000 95%)", pointerEvents: "none", zIndex: 2 }} />

      {/* top bar */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", paddingTop: "calc(16px + env(safe-area-inset-top))" }}>
        <span style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: FINTER }}>
          Nyíregyháza
        </span>
        <a href="https://www.instagram.com/jozsef.soltesz_tattoo/" target="_blank" rel="noopener noreferrer"
          onClick={() => haptic(8)}
          style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "7px 12px", textDecoration: "none", WebkitTapHighlightColor: "transparent" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8">
            <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="rgba(255,255,255,0.5)" stroke="none" />
          </svg>
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontFamily: FINTER, letterSpacing: "0.04em" }}>Instagram</span>
        </a>
      </div>

      {/* Hero */}
      <Hero onTabOpen={openTab} />

      {/* Sheet */}
      <BottomSheet activeTab={activeTab} onBook={goBook} onClose={closeSheet} />

      {/* Tab bar */}
      <TabBar active={activeTab} onSelect={openTab} />

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.7); }
        }
        * { -webkit-tap-highlight-color: transparent; }
        input, textarea, select { -webkit-appearance: none; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        select option { background: #0a0202; color: #fff; }
      `}</style>
    </div>
  );
}
