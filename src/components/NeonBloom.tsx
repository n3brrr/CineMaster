'use client';

import { useRef } from 'react';
import gsap from 'gsap';

interface NeonBloomProps {
  children: React.ReactNode;
}

export default function NeonBloom({ children }: NeonBloomProps) {
  const bloomRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(bloomRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(bloomRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        ref={bloomRef}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2  h-6 opacity-0 blur-xl rounded-full w-2/4"
        style={{ background: 'radial-gradient(ellipse, #f02222 0%, #b91c1c 50%, transparent 80%)' }}
      />
    </div>
  );
}