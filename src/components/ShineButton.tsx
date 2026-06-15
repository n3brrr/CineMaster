"use client";

import { useRef } from "react";
import gsap from "gsap";

interface ShineButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function ShineButton({ children, onClick }: ShineButtonProps) {
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.fromTo(
      shineRef.current,
      { x: "-100%" },
      { x: "100%", duration: 0.8, ease: "power2.inOut" },
    );
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      className="relative overflow-hidden rounded-lg p-2 px-6 bg-red-500 text-white font-bold"
    >
      <div
        ref={shineRef}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-red-300/80 to-transparent -translate-x-full"
      />
      <span className="relative">{children}</span>
    </button>
  );
}
