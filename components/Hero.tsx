"use client";

import { useState, useEffect, useRef } from "react";

const NODES = [
  {
    id: "rolam",
    label: "Rólam",
    angle: -90,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: "portfolio",
    label: "Portfólió",
    angle: -18,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    id: "galeria",
    label: "Galéria",
    angle: 54,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    id: "foglalas",
    label: "Foglalás",
    angle: 126,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    id: "kapcsolat",
    label: "Kapcsolat",
    angle: 198,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

const RADIUS = 200;
const CX = 0;
const CY = 0;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export default function Hero() {
  const [active, setActive] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const rotRef = useRef(0);

  useEffect(() => {
    const tick = (now: number) => {
      if (!paused) {
        const delta = now - lastRef.current;
        rotRef.current = (rotRef.current + delta * 0.008) % 360;
        setRotation(rotRef.current);
      }
      lastRef.current = now;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused]);

  const handleNode = (id: string) => {
    setActive(id === active ? null : id);
    const el = document.getElementById(id);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Subtle radial bg glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(30,30,60,0.5) 0%, #000 70%)",
        pointerEvents: "none",
      }} />

      {/* Top label */}
      <div style={{
        position: "absolute",
        top: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        zIndex: 10,
      }}>
        <span style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "#555",
        }}>
          Nyíregyháza · Tetoválóművész
        </span>
      </div>

      {/* Orbital SVG */}
      <div style={{ position: "relative", width: "520px", height: "520px", maxWidth: "90vw", maxHeight: "90vw" }}>
        <svg
          viewBox="-260 -260 520 520"
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0 }}
        >
          {/* Outer glow ring */}
          <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"
            strokeDasharray="4 8" />

          {/* Rotating nodes group */}
          <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "0 0", transition: "none" }}>
            {NODES.map((node) => {
              const nx = CX + RADIUS * Math.cos(toRad(node.angle));
              const ny = CY + RADIUS * Math.sin(toRad(node.angle));
              const isActive = active === node.id;
              return (
                <g key={node.id}>
                  {/* Connector line from center */}
                  <line x1={0} y1={0} x2={nx} y2={ny}
                    stroke={isActive ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.04)"}
                    strokeWidth={isActive ? 0.8 : 0.5} />
                  {/* Node glow */}
                  {isActive && (
                    <circle cx={nx} cy={ny} r={32} fill="rgba(255,255,255,0.06)" />
                  )}
                  {/* Node circle */}
                  <circle
                    cx={nx} cy={ny} r={24}
                    fill={isActive ? "rgba(50,50,80,0.9)" : "rgba(20,20,20,0.9)"}
                    stroke={isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)"}
                    strokeWidth={isActive ? 1 : 0.8}
                    style={{ cursor: "pointer", filter: isActive ? "drop-shadow(0 0 12px rgba(255,255,255,0.3))" : "none" }}
                  />
                </g>
              );
            })}
          </g>
        </svg>

        {/* Node icon buttons + labels (positioned via JS, counter-rotate to stay upright) */}
        {NODES.map((node) => {
          const effectiveAngle = node.angle + rotation;
          const nx = 260 + RADIUS * Math.cos(toRad(effectiveAngle));
          const ny = 260 + RADIUS * Math.sin(toRad(effectiveAngle));
          const isActive = active === node.id;

          // Label offset: push outward
          const labelDist = RADIUS + 48;
          const lx = 260 + labelDist * Math.cos(toRad(effectiveAngle));
          const ly = 260 + labelDist * Math.sin(toRad(effectiveAngle));

          return (
            <div key={node.id}>
              {/* Icon button */}
              <button
                onClick={() => handleNode(node.id)}
                style={{
                  position: "absolute",
                  left: `${(nx / 520) * 100}%`,
                  top: `${(ny / 520) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: isActive ? "#fff" : "#888",
                  transition: "color 0.3s",
                  zIndex: 5,
                }}
              >
                {node.icon}
              </button>
              {/* Label */}
              <span
                style={{
                  position: "absolute",
                  left: `${(lx / 520) * 100}%`,
                  top: `${(ly / 520) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  fontSize: "11px",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isActive ? "#fff" : "#555",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  transition: "color 0.3s",
                  zIndex: 5,
                  textShadow: isActive ? "0 0 12px rgba(255,255,255,0.5)" : "none",
                }}
              >
                {node.label}
              </span>
            </div>
          );
        })}

        {/* Central orb */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}>
          {/* Glow layers */}
          <div style={{
            position: "absolute",
            inset: "-40px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(80,100,220,0.15) 0%, transparent 70%)",
            animation: "pulse 3s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute",
            inset: "-20px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(100,120,255,0.2) 0%, transparent 60%)",
            animation: "pulse 3s ease-in-out infinite 0.5s",
          }} />
          {/* Orb */}
          <div style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #8090ff, #4050cc 50%, #202080)",
            boxShadow: "0 0 30px rgba(80,100,255,0.4), 0 0 60px rgba(80,100,200,0.2), inset 0 0 20px rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
          }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.05em",
              userSelect: "none",
            }}>S.J.</span>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div style={{
        position: "absolute",
        bottom: "48px",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        zIndex: 10,
      }}>
        <h1 style={{
          fontSize: "clamp(22px, 4vw, 36px)",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}>
          Soltész József
        </h1>
        <p style={{ fontSize: "12px", color: "#444", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Anime · Japanese · Custom Design
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}
