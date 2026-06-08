"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import JapaneseBackground from "./JapaneseBackground";

/* ─── design tokens ─── */
const RED      = "rgba(210,20,20,1)";
const RED_MID  = "rgba(210,20,20,0.7)";
const RED_LOW  = "rgba(210,20,20,0.18)";
const RED_GLOW = "rgba(210,20,20,0.35)";
const FBEBAS   = "var(--font-bebas), 'Bebas Neue', sans-serif";
const FINTER   = "var(--font-inter), 'Inter', sans-serif";
const FONT     = FINTER; // default body font

/* ─── nodes ─── */
const NODES = [
  { id: "rolam",     label: "Rólam",    angle: -90,  svgPath: "M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c0-4 3.6-7 8-7s8 3 8 7" },
  { id: "portfolio", label: "Portfólió",angle: -18,  svgPath: "M3 7h18v14H3zM3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" },
  { id: "arlista",   label: "Árlista",  angle:  54,  svgPath: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01" },
  { id: "foglalas",  label: "Foglalás", angle:  126, svgPath: "M3 4h18v18H3zM16 2v4M8 2v4M3 10h18" },
  { id: "kapcsolat", label: "Kapcsolat",angle:  198, svgPath: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
];

const ORBIT_R = 118;  // drawn ring radius (clearly inside buttons)
const RADIUS  = 225;  // node & label placement radius (clearly outside ring)
const SIZE    = 530;
const C       = SIZE / 2;

const rad = (d: number) => (d * Math.PI) / 180;

/* ─── shared input style ─── */
const inp: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "6px",
  padding: "11px 13px",
  color: "#fff",
  fontSize: "13px",
  outline: "none",
  fontFamily: FONT,
  letterSpacing: "0.01em",
};

/* ══════════════════════ PANEL CONTENT ══════════════════════ */

function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { v.play().then(() => setPlaying(true)).catch(() => {}); }
      else { v.pause(); setPlaying(false); }
    }, { threshold: 0.3 });
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ position: "relative", marginBottom: "28px" }}>
      {/* Ambient glow behind the video */}
      <div style={{ position: "absolute", inset: "-12px", background: "radial-gradient(ellipse at center, rgba(210,20,20,0.18) 0%, transparent 70%)", borderRadius: "20px", pointerEvents: "none" }} />

      {/* Outer frame */}
      <div style={{ position: "relative", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(210,20,20,0.35)", boxShadow: "0 0 0 1px rgba(210,20,20,0.1), 0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(210,20,20,0.12)" }}>

        {/* Corner accents */}
        {[{t:"0",l:"0",bt:"none",br:"none"},{t:"0",r:"0",bt:"none",bl:"none"},{b:"0",l:"0",bb:"none",br:"none"},{b:"0",r:"0",bb:"none",bl:"none"}].map((pos,i) => (
          <div key={i} style={{ position:"absolute", width:"14px", height:"14px", zIndex:4, ...Object.fromEntries(Object.entries(pos).map(([k,v]) => [k==="t"?"top":k==="b"?"bottom":k==="l"?"left":"right", v])), borderTop: i<2?"1px solid rgba(210,20,20,0.9)":undefined, borderBottom: i>=2?"1px solid rgba(210,20,20,0.9)":undefined, borderLeft: i%2===0?"1px solid rgba(210,20,20,0.9)":undefined, borderRight: i%2===1?"1px solid rgba(210,20,20,0.9)":undefined }} />
        ))}

        {/* Video */}
        <div style={{ position: "relative", aspectRatio: "9/16", background: "#000", overflow: "hidden" }}>
          <video
            ref={vidRef}
            src="/process.mp4"
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />

          {/* Cinematic top/bottom bars */}
          <div style={{ position:"absolute",top:0,left:0,right:0,height:"18%",background:"linear-gradient(to bottom,rgba(0,0,0,0.75),transparent)",pointerEvents:"none",zIndex:2 }} />
          <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"35%",background:"linear-gradient(to top,rgba(0,0,0,0.92),transparent)",pointerEvents:"none",zIndex:2 }} />

          {/* "TRUST THE PROCESS" overlay */}
          <div style={{ position:"absolute",bottom:"18px",left:"16px",right:"16px",zIndex:3 }}>
            <div style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px" }}>
              <div style={{ width:"20px",height:"1px",background:"rgba(210,20,20,0.7)" }} />
              <span style={{ fontSize:"9px",letterSpacing:"0.3em",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",fontFamily:FONT }}>A folyamat</span>
            </div>
            <p style={{ fontFamily:FBEBAS,fontSize:"26px",letterSpacing:"0.08em",color:"#fff",lineHeight:1.0,textShadow:"0 2px 20px rgba(0,0,0,0.9)" }}>
              TRUST THE<br /><span style={{ color:RED }}>PROCESS</span>
            </p>
          </div>

          {/* Playing indicator */}
          {playing && (
            <div style={{ position:"absolute",top:"12px",right:"12px",zIndex:3,display:"flex",alignItems:"center",gap:"5px" }}>
              <div style={{ width:"6px",height:"6px",borderRadius:"50%",background:RED,animation:"pulseDot 1.2s ease-in-out infinite" }} />
              <span style={{ fontSize:"8px",letterSpacing:"0.2em",color:"rgba(255,255,255,0.5)",textTransform:"uppercase",fontFamily:FONT }}>LIVE</span>
            </div>
          )}
        </div>
      </div>

      {/* Caption below */}
      <p style={{ fontSize:"10px",color:"rgba(255,255,255,0.2)",textAlign:"center",marginTop:"10px",letterSpacing:"0.15em",fontFamily:FONT }}>
        @dr.j_tattoo · Munkamenet dokumentáció
      </p>
    </div>
  );
}

function PanelRolam() {
  return (
    <div style={{ fontFamily: FONT }}>
      <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "12px" }}>01 — Rólam</p>
      <h2 style={{ fontSize: "36px", fontWeight: 400, color: "#fff", lineHeight: 1.05, marginBottom: "20px", letterSpacing: "0.04em", fontFamily: FBEBAS }}>
        A tinta mögötti<br /><span style={{ color: RED }}>ember</span>
      </h2>

      {/* ── Premium video section ── */}
      <VideoSection />

      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: "12px" }}>
        Soltész József vagyok, Nyíregyháza tetoválóművésze. Anime, japán és custom design stílusban alkotok egyedi, személyre szabott tetoválásokat.
      </p>
      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: "16px" }}>
        Minden tetoválás egyedi történet. Precizitás, részletgazdagság, és az elképzelésed tökéletes megvalósítása — ez a célom.
      </p>

      {/* Külföldi tapasztalat */}
      <div style={{ background: "rgba(210,20,20,0.07)", border: "1px solid rgba(210,20,20,0.25)", borderRadius: "10px", padding: "14px 16px", marginBottom: "20px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.22em", color: RED, textTransform: "uppercase", marginBottom: "10px" }}>🌍 Külföldi tapasztalat</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {[{ flag: "🇧🇪", c: "Belgium" }, { flag: "🇩🇪", c: "Németország" }, { flag: "🇬🇧", c: "Anglia" }, { flag: "🇦🇺", c: "Ausztrália" }].map(({ flag, c }) => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
              <span style={{ fontSize: "16px" }}>{flag}</span>{c}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
        {[{ v: "5+", l: "Év tapasztalat" }, { v: "500+", l: "Tetoválás" }, { v: "4", l: "Ország" }, { v: "100%", l: "Egyedi" }].map(s => (
          <div key={s.l} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: RED, marginBottom: "4px", fontFamily: FONT }}>{s.v}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{s.l}</div>
          </div>
        ))}
      </div>
      {["Nyíregyháza, Magyarország", "Foglalás üzenetben — TikTok & Instagram", "Anime · Japanese · Custom Design"].map((t, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.3)", fontSize: "13px", marginBottom: "9px" }}>
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: RED, flexShrink: 0 }} />
          {t}
        </div>
      ))}
    </div>
  );
}

function PanelPortfolio() {
  return (
    <div style={{ fontFamily: FONT }}>
      <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "18px" }}>02 — Portfólió</p>
      <h2 style={{ fontSize: "36px", fontWeight: 400, color: "#fff", lineHeight: 1.05, marginBottom: "22px", letterSpacing: "0.04em", fontFamily: FBEBAS }}>Munkastílusok</h2>
      {[
        { n: "Anime",         d: "Manga és anime karakterek részletgazdag, fekete-szürke megvalósítása.", tags: ["Fekete-szürke", "Részletgazdag"], c: "2+ alkotás" },
        { n: "Japanese",      d: "Tradicionális japán elemek modern precizitással ötvözve.",             tags: ["Tradicionális", "Erőteljes"],   c: "5+ alkotás" },
        { n: "Custom Design", d: "Teljesen egyedi, személyre szabott tervek — nincs két egyforma.",     tags: ["Egyedi", "Kreatív"],            c: "100+ alkotás" },
      ].map((s, i) => (
        <div key={i}
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "18px", marginBottom: "10px", transition: "all 0.2s", cursor: "default" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(210,20,20,0.06)"; e.currentTarget.style.borderColor = "rgba(210,20,20,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
          <div style={{ fontSize: "17px", fontWeight: 700, color: "#fff", marginBottom: "7px", letterSpacing: "-0.01em" }}>{s.n}</div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: "10px" }}>{s.d}</div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
            {s.tags.map(t => <span key={t} style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: RED, background: RED_LOW, border: `1px solid rgba(210,20,20,0.25)`, borderRadius: "4px", padding: "3px 8px" }}>{t}</span>)}
          </div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "8px" }}>{s.c}</div>
        </div>
      ))}
    </div>
  );
}

function PanelArlista() {
  const row = (label: string, val: string, sub?: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div>
        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", fontFamily: FONT }}>{label}</span>
        {sub && <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", marginTop: "2px", fontFamily: FONT }}>{sub}</p>}
      </div>
      <span style={{ fontSize: "15px", fontWeight: 600, color: RED, fontFamily: FONT, whiteSpace: "nowrap" }}>{val}</span>
    </div>
  );
  return (
    <div style={{ fontFamily: FONT }}>
      <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "18px" }}>03 — Árlista</p>
      <h2 style={{ fontSize: "36px", fontWeight: 400, color: "#fff", lineHeight: 1.05, marginBottom: "6px", letterSpacing: "0.04em", fontFamily: FBEBAS }}>
        Árak &amp; <span style={{ color: RED }}>Feltételek</span>
      </h2>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "24px", lineHeight: 1.6 }}>
        A tetoválás ára munkaidő alapján számolódik.
      </p>

      {/* Napi díj kiemelve */}
      <div style={{ background: "rgba(210,20,20,0.08)", border: "1px solid rgba(210,20,20,0.3)", borderRadius: "12px", padding: "20px", marginBottom: "20px", textAlign: "center" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "8px" }}>Napi díj</p>
        <p style={{ fontSize: "42px", fontWeight: 400, color: "#fff", fontFamily: FBEBAS, letterSpacing: "0.06em", lineHeight: 1 }}>
          60 000 <span style={{ color: RED }}>Ft</span>
        </p>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "6px" }}>/ munkanap (kb. 6–8 óra)</p>
      </div>

      {/* Részletes lista */}
      <div style={{ marginBottom: "20px" }}>
        {row("Kis tetoválás", "15 000 – 25 000 Ft", "kb. 1–2 óra")}
        {row("Közepes tetoválás", "25 000 – 45 000 Ft", "kb. 2–4 óra")}
        {row("Nagy munka / fél nap", "30 000 – 50 000 Ft", "kb. 4–6 óra")}
        {row("Egész napos ülés", "60 000 Ft", "kb. 6–8 óra")}
        {row("Fedés (cover-up)", "Egyéni árajánlat", "konzultáció szükséges")}
      </div>

      {/* Megjegyzés */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "14px", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", lineHeight: 1.8 }}>
          📍 Az árak tájékoztató jellegűek. A pontos ár a motívum méretétől és összetettségétől függ.<br />
          📌 Foglaláshoz 5 000 Ft foglaló szükséges, ami beleszámít az árba.<br />
          📌 Ingyenes konzultáció minden munkához.
        </p>
      </div>
    </div>
  );
}

function PanelFoglalas() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", style: "", desc: "" });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  if (done) return (
    <div style={{ textAlign: "center", paddingTop: "32px", fontFamily: FONT }}>
      <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: RED_LOW, border: `1px solid rgba(210,20,20,0.35)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
      </div>
      <h3 style={{ fontSize: "30px", fontWeight: 400, color: "#fff", marginBottom: "10px", letterSpacing: "0.04em", fontFamily: FBEBAS }}>Elküldve!</h3>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", lineHeight: 1.7, marginBottom: "20px" }}>Hamarosan visszajelzek az elérhető időpontokkal.</p>
      <button onClick={() => { setDone(false); setForm({ name: "", phone: "", style: "", desc: "" }); }} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: "6px", padding: "10px 20px", fontSize: "12px", cursor: "pointer", fontFamily: FONT }}>Új kérelem</button>
    </div>
  );
  return (
    <div style={{ fontFamily: FONT }}>
      <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "18px" }}>04 — Foglalás</p>
      <h2 style={{ fontSize: "36px", fontWeight: 400, color: "#fff", lineHeight: 1.05, marginBottom: "8px", letterSpacing: "0.04em", fontFamily: FBEBAS }}>
        Foglalj<br /><span style={{ color: RED }}>időpontot</span>
      </h2>
      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", lineHeight: 1.7, marginBottom: "20px" }}>Töltsd ki az adatokat és visszajelzek az időpontokkal.</p>
      <form onSubmit={e => { e.preventDefault(); setDone(true); }} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <label style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em", marginBottom: "5px", textTransform: "uppercase" }}>Név *</label>
            <input required value={form.name} onChange={e => set("name", e.target.value)} placeholder="Kovács Péter" style={inp} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em", marginBottom: "5px", textTransform: "uppercase" }}>Telefon *</label>
            <input required value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+36 30..." style={inp} />
          </div>
        </div>
        <div>
          <label style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em", marginBottom: "5px", textTransform: "uppercase" }}>Stílus *</label>
          <select required value={form.style} onChange={e => set("style", e.target.value)} style={{ ...inp, appearance: "none" }}>
            <option value="">Válassz...</option>
            <option value="anime">Anime</option>
            <option value="japanese">Japanese</option>
            <option value="custom">Custom Design</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em", marginBottom: "5px", textTransform: "uppercase" }}>Leírás *</label>
          <textarea required rows={4} value={form.desc} onChange={e => set("desc", e.target.value)} placeholder="Írd le az elképzelésed..." style={{ ...inp, resize: "vertical" }} />
        </div>
        <button type="submit"
          style={{ background: RED, border: "none", color: "#fff", borderRadius: "6px", padding: "13px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", marginTop: "2px", fontFamily: FONT, transition: "opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
          Elküldés
        </button>
      </form>
    </div>
  );
}

function PanelKapcsolat() {
  return (
    <div style={{ fontFamily: FONT }}>
      <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "18px" }}>05 — Kapcsolat</p>
      <h2 style={{ fontSize: "36px", fontWeight: 400, color: "#fff", lineHeight: 1.05, marginBottom: "22px", letterSpacing: "0.04em", fontFamily: FBEBAS }}>
        Lépj<br />kapcsolatba
      </h2>
      {[
        { p: "Instagram", h: "@jozsef.soltesz_tattoo", d: "Portfólió & üzenetfoglalás", url: "https://www.instagram.com/jozsef.soltesz_tattoo/" },
        { p: "TikTok",    h: "@soltesz.j_tattoo", d: "Videók, munkák menet közben",   url: "https://www.tiktok.com/@soltesz.j_tattoo" },
        { p: "Helyszín",  h: "Nyíregyháza",        d: "Magyarország, Sz-Sz-Bereg megye", url: "https://maps.google.com/?q=Nyíregyháza" },
      ].map(c => (
        <a key={c.p} href={c.url} target="_blank" rel="noopener noreferrer"
          style={{ display: "block", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "16px 18px", marginBottom: "8px", textDecoration: "none", transition: "all 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = RED_LOW; (e.currentTarget as HTMLElement).style.borderColor = "rgba(210,20,20,0.3)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px" }}>{c.p}</div>
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: "3px", letterSpacing: "-0.01em" }}>{c.h}</div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{c.d}</div>
        </a>
      ))}
      <div style={{ marginTop: "20px", background: RED_LOW, border: `1px solid rgba(210,20,20,0.25)`, borderRadius: "10px", padding: "20px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginBottom: "14px", lineHeight: 1.6 }}>Kész vagy az egyedi tetoválásodra?</p>
        <a href="https://www.instagram.com/jozsef.soltesz_tattoo/" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", background: RED, color: "#fff", borderRadius: "6px", padding: "11px 22px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: FONT }}>
          Írj üzenetet
        </a>
      </div>
    </div>
  );
}

const PANELS: Record<string, React.ReactNode> = {
  rolam:     <PanelRolam />,
  portfolio: <PanelPortfolio />,
  arlista:   <PanelArlista />,
  foglalas:  <PanelFoglalas />,
  kapcsolat: <PanelKapcsolat />,
};

/* ══════════════════════ MAIN ══════════════════════ */
export default function OrbitalPage() {
  const [active, setActive] = useState<string | null>(null);

  const ringRef  = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const labelRefs= useRef<(HTMLSpanElement   | null)[]>([]);
  const activeRef= useRef<string | null>(null);

  useEffect(() => { activeRef.current = active; }, [active]);

  /* sync button styles when active changes */
  useEffect(() => {
    NODES.forEach((node, i) => {
      const btn = nodeRefs.current[i];
      const lbl = labelRefs.current[i];
      if (!btn) return;
      const on = active === node.id;
      btn.style.background   = on ? "rgba(210,20,20,0.22)" : "rgba(255,255,255,0.05)";
      btn.style.borderColor  = on ? "rgba(210,20,20,0.8)"  : "rgba(255,255,255,0.12)";
      btn.style.color        = on ? "#fff"                  : "rgba(255,255,255,0.45)";
      btn.style.boxShadow    = on ? `0 0 22px rgba(210,20,20,0.45)` : "none";
      if (lbl) {
        lbl.style.color      = on ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)";
        lbl.style.fontWeight = on ? "600" : "400";
        lbl.style.textShadow = on ? "0 0 14px rgba(210,20,20,0.5)" : "none";
      }
    });
  }, [active]);

  /* rAF animation — zero React re-renders */
  useEffect(() => {
    let rot = 0, last = 0, hovIdx = -1;
    let animId: number;

    const setStyle = (btn: HTMLButtonElement, lbl: HTMLSpanElement | null, hover: boolean, nodeId: string) => {
      const isActive = activeRef.current === nodeId;
      if (hover) {
        btn.style.background  = "rgba(255,255,255,0.1)";
        btn.style.borderColor = "rgba(255,255,255,0.35)";
        btn.style.color       = "#fff";
        btn.style.boxShadow   = "0 0 12px rgba(255,255,255,0.08)";
        if (lbl) lbl.style.color = "rgba(255,255,255,0.8)";
      } else {
        btn.style.background  = isActive ? "rgba(210,20,20,0.22)" : "rgba(255,255,255,0.05)";
        btn.style.borderColor = isActive ? "rgba(210,20,20,0.8)"  : "rgba(255,255,255,0.12)";
        btn.style.color       = isActive ? "#fff"                  : "rgba(255,255,255,0.45)";
        btn.style.boxShadow   = isActive ? "0 0 22px rgba(210,20,20,0.45)" : "none";
        if (lbl) lbl.style.color = isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)";
      }
    };

    const cleanups: (() => void)[] = [];
    NODES.forEach((node, i) => {
      const btn = nodeRefs.current[i];
      const lbl = labelRefs.current[i];
      if (!btn) return;
      const enter = () => { hovIdx = i; setStyle(btn, lbl, true,  node.id); };
      const leave = () => { hovIdx = -1; setStyle(btn, lbl, false, node.id); };
      btn.addEventListener("mouseenter", enter);
      btn.addEventListener("mouseleave", leave);
      cleanups.push(() => { btn.removeEventListener("mouseenter", enter); btn.removeEventListener("mouseleave", leave); });
    });

    const tick = (now: number) => {
      const delta = last ? now - last : 0;
      last = now;
      if (hovIdx === -1) rot = (rot + delta * 0.009) % 360;

      if (ringRef.current) ringRef.current.style.transform = `rotate(${rot}deg)`;

      nodeRefs.current.forEach(b => {
        if (b) b.style.transform = `translate(-50%,-50%) rotate(${-rot}deg)`;
      });

      NODES.forEach((node, i) => {
        const lbl = labelRefs.current[i];
        if (!lbl) return;
        const a = node.angle + rot;
        lbl.style.left = C + (RADIUS + 64) * Math.cos(rad(a)) + "px";
        lbl.style.top  = C + (RADIUS + 64) * Math.sin(rad(a)) + "px";
      });

      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(animId); cleanups.forEach(f => f()); };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", fontFamily: FONT }}>

      {/* Japanese animated background */}
      <JapaneseBackground />

      {/* BG radial vignette – simple edge darkening, no red ring artifact */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, transparent 22%, rgba(0,0,0,0.5) 60%, #000 92%)", pointerEvents: "none", zIndex: 2 }} />

      {/* Top label */}
      <div style={{ position: "absolute", top: "30px", left: "50%", transform: "translateX(-50%)", zIndex: 20, pointerEvents: "none" }}>
        <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", whiteSpace: "nowrap", fontFamily: FINTER }}>
          Nyíregyháza · Tetoválóművész
        </span>
      </div>

      {/* Orbital wrapper */}
      <div style={{ position: "relative", width: SIZE + "px", height: SIZE + "px", flexShrink: 0, transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)", transform: active ? "translateX(-120px)" : "translateX(0)", zIndex: 10 }}>

        {/* ── Rotating container ── */}
        <div ref={ringRef} style={{ position: "absolute", inset: 0, transformOrigin: `${C}px ${C}px`, willChange: "transform" }}>
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <circle cx={C} cy={C} r={ORBIT_R - 15} fill="none" stroke="rgba(210,20,20,0.06)" strokeWidth="1" />
            <circle cx={C} cy={C} r={ORBIT_R}     fill="none" stroke="rgba(210,20,20,0.28)" strokeWidth="1.2" />
            <circle cx={C} cy={C} r={ORBIT_R}     fill="none" stroke="rgba(210,20,20,0.12)" strokeWidth="0.6" strokeDasharray="3 12" />
          </svg>

          {NODES.map((node, i) => {
            const nx = C + RADIUS * Math.cos(rad(node.angle));
            const ny = C + RADIUS * Math.sin(rad(node.angle));
            return (
              <button key={node.id} ref={el => { nodeRefs.current[i] = el; }}
                onClick={() => setActive(p => p === node.id ? null : node.id)}
                style={{ position: "absolute", left: nx + "px", top: ny + "px", transform: "translate(-50%,-50%)", width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s, color 0.2s", willChange: "transform", zIndex: 5 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={node.svgPath} />
                </svg>
              </button>
            );
          })}
        </div>

        {/* Labels (outside rotating div) */}
        {NODES.map((node, i) => {
          const lx = C + (RADIUS + 64) * Math.cos(rad(node.angle));
          const ly = C + (RADIUS + 64) * Math.sin(rad(node.angle));
          return (
            <span key={node.id} ref={el => { labelRefs.current[i] = el; }}
              style={{ position: "absolute", left: lx + "px", top: ly + "px", transform: "translate(-50%,-50%)", fontSize: "10px", fontWeight: 400, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", whiteSpace: "nowrap", pointerEvents: "none", transition: "color 0.2s", willChange: "left, top", zIndex: 4, fontFamily: FONT }}>
              {node.label}
            </span>
          );
        })}

        {/* Central monogram — no sphere, just text + subtle glow */}
        <div style={{ position: "absolute", left: C + "px", top: C + "px", transform: "translate(-50%,-50%)", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* outer pulse glow */}
          <div style={{ position: "absolute", inset: "-60px", borderRadius: "50%", background: "radial-gradient(circle, rgba(190,10,10,0.22) 0%, transparent 70%)", animation: "pulseGlow 3.5s ease-in-out infinite" }} />
          <div style={{ position: "absolute", inset: "-30px", borderRadius: "50%", background: "radial-gradient(circle, rgba(210,20,20,0.28) 0%, transparent 65%)", animation: "pulseGlow 3.5s ease-in-out infinite 0.8s" }} />
          {/* thin ring */}
          <div style={{ position: "absolute", width: "64px", height: "64px", borderRadius: "50%", border: "1px solid rgba(210,20,20,0.35)" }} />
          {/* monogram */}
          <span style={{
            fontFamily: FBEBAS,
            fontSize: "30px",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.88)",
            textShadow: "0 0 18px rgba(210,20,20,0.7), 0 0 40px rgba(180,10,10,0.3)",
            userSelect: "none",
            lineHeight: 1,
          }}>
            S.J.
          </span>
        </div>
      </div>

      {/* Bottom title */}
      <div style={{ position: "absolute", bottom: "34px", left: "50%", transform: "translateX(-50%)", textAlign: "center", pointerEvents: "none", zIndex: 20, transition: "opacity 0.4s", opacity: active ? 0 : 1 }}>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#fff", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px", fontFamily: FBEBAS, lineHeight: 1 }}>
          Soltész József
        </h1>
        <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.28em", textTransform: "uppercase", fontFamily: FINTER }}>
          Anime · Japanese · Custom Design
        </p>
      </div>

      {/* Content panel */}
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "360px", background: "rgba(4,2,2,0.97)", borderLeft: "1px solid rgba(210,20,20,0.12)", backdropFilter: "blur(24px)", transform: active ? "translateX(0)" : "translateX(100%)", transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)", zIndex: 30, display: "flex", flexDirection: "column" }}>
        <button onClick={() => setActive(null)}
          style={{ position: "absolute", top: "18px", right: "18px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50%", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.4)", zIndex: 2, transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = RED_LOW; e.currentTarget.style.borderColor = "rgba(210,20,20,0.4)"; e.currentTarget.style.color = RED; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
        <div style={{ flex: 1, overflowY: "auto", padding: "50px 28px 28px", scrollbarWidth: "thin", scrollbarColor: "rgba(210,20,20,0.2) transparent" }}>
          {active && PANELS[active]}
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.07); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.7); }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.18); }
        select option { background: #0a0202; color: #fff; }
      `}</style>
    </div>
  );
}
