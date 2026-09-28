"use client";

import { useEffect, useRef } from "react";

export function GlobeFilm({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (motion.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        video.muted = true;
        void video.play();
      }
    };
    apply();
    motion.addEventListener("change", apply);
    return () => motion.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      poster="/infographics/earth-asia.png"
      aria-label="Earth turning from the Himalayas across the Atlantic to the Pacific"
    >
      <source src="/infographics/global-reach.mp4?v=2" type="video/mp4" />
    </video>
  );
}
