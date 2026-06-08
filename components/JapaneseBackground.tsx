"use client";

import { useEffect, useRef } from "react";

interface Cloud {
  x: number; y: number; w: number; speed: number; opacity: number; bumps: number;
}

export default function JapaneseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── clouds ── */
    const mkCloud = (): Cloud => ({
      x:       Math.random() * canvas.width,
      y:       8 + Math.random() * 80,        // stay in top ~12% of screen
      w:       90 + Math.random() * 170,
      speed:   0.07 + Math.random() * 0.13,
      opacity: 0.05 + Math.random() * 0.07,
      bumps:   4 + Math.floor(Math.random() * 4),
    });
    const clouds: Cloud[] = Array.from({ length: 6 }, mkCloud);

    function drawCloud(c: Cloud) {
      const { x, y, w, opacity, bumps } = c;
      const segW = w / bumps;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle   = "rgba(200,30,30,1)";
      ctx.strokeStyle = "rgba(220,50,50,0.5)";
      ctx.lineWidth   = 0.8;

      ctx.beginPath();
      ctx.moveTo(x, y + 18);
      ctx.lineTo(x + w, y + 18);
      ctx.arc(x + w - segW * 0.4, y + 10, 10, 0, -Math.PI, true);
      for (let i = bumps - 1; i >= 0; i--) {
        const bx = x + segW * i + segW * 0.5;
        const r  = 10 + Math.sin(i * 1.3) * 4;
        ctx.arc(bx, y + 6, r, 0, Math.PI, true);
      }
      ctx.arc(x + segW * 0.4, y + 10, 10, Math.PI, 0, true);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    /* ── waves ── */
    const waveLayers = [
      { yFrac: 0.98, amp: 22, freq: 3.2, spd: 0.28, op: 0.18 },  // bottom 2%
      { yFrac: 0.94, amp: 26, freq: 2.8, spd: 0.22, op: 0.14 },  // bottom 6%
      { yFrac: 0.91, amp: 24, freq: 2.5, spd: 0.17, op: 0.11 },  // bottom 9%
      { yFrac: 0.88, amp: 20, freq: 2.2, spd: 0.13, op: 0.08 },  // bottom 12%
      { yFrac: 0.85, amp: 17, freq: 2.0, spd: 0.10, op: 0.06 },  // bottom 15%
    ];

    function drawWaves(phase: number) {
      const W = canvas.width;
      const H = canvas.height;

      waveLayers.forEach(({ yFrac, amp, freq, spd, op }) => {
        const yBase = H * yFrac;
        const p     = phase * spd;

        /* wave body fill */
        ctx.beginPath();
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= W; x += 3) {
          const t    = (x / W) * freq * Math.PI * 2 - p;
          const main = Math.sin(t) * amp;
          const curl = Math.sin(t * 2 + 0.5) * amp * 0.22;
          const crest= Math.max(0, -Math.cos(t)) * amp * 0.12;
          ctx.lineTo(x, yBase + main + curl - crest);
        }
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
        ctx.fillStyle = `rgba(160,10,10,${op * 0.45})`;
        ctx.fill();

        /* crest line */
        ctx.beginPath();
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= W; x += 3) {
          const t    = (x / W) * freq * Math.PI * 2 - p;
          const main = Math.sin(t) * amp;
          const curl = Math.sin(t * 2 + 0.5) * amp * 0.22;
          const crest= Math.max(0, -Math.cos(t)) * amp * 0.12;
          ctx.lineTo(x, yBase + main + curl - crest);
        }
        ctx.strokeStyle = `rgba(220,30,30,${op * 1.6})`;
        ctx.lineWidth   = 1.2;
        ctx.stroke();

        /* small curl arcs at wave peaks */
        const wLen = W / freq;
        for (let i = 0; i < freq * 2; i++) {
          const cx = ((i * wLen * 0.5) - (p / (Math.PI * 2)) * wLen + W * 2) % (W + wLen) - wLen * 0.5;
          const t2 = (cx / W) * freq * Math.PI * 2 - p;
          const cy = yBase
            + Math.sin(t2) * amp
            + Math.sin(t2 * 2 + 0.5) * amp * 0.22
            - amp * 0.12;
          ctx.beginPath();
          ctx.arc(cx, cy - 2, 4, Math.PI * 1.15, Math.PI * 2.05);
          ctx.strokeStyle = `rgba(255,70,70,${op * 0.9})`;
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        }
      });
    }

    /* ── animation loop ── */
    let phase   = 0;
    let animId: number;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      phase += 0.012;

      drawWaves(phase);

      clouds.forEach(c => {
        c.x -= c.speed;
        if (c.x + c.w < -20) c.x = canvas.width + 20;
        drawCloud(c);
      });

      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
