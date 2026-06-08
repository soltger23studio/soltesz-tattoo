"use client";

import { useEffect, useState } from "react";
import OrbitalPage from "./OrbitalPage";
import MobilePage from "./MobilePage";

export default function ResponsivePage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    const mq = window.matchMedia("(max-width: 767px)");
    mq.addEventListener("change", check);
    return () => mq.removeEventListener("change", check);
  }, []);

  // avoid flash — render nothing until we know the breakpoint
  if (isMobile === null) return null;

  return isMobile ? <MobilePage /> : <OrbitalPage />;
}
