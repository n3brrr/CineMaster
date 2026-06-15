'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ShineBorderProps {
  children: React.ReactNode;
}

export default function ShineBorder({ children }: ShineBorderProps) {
  const shineRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
    gsap.to(shineRef.current, {
      rotate: 360,
      duration: 12,
      repeat: -2,
      ease: 'none',
      transformOrigin: '50% 50%',
    });
  }, []);

  return ( 
    <button className="relative rounded-lg px-6 py-2 overflow-hidden ">
      <div className="absolute inset-0 rounded-lg overflow-hidden ">
        <div
          ref={shineRef}
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 " 
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, transparent 70%, #b40000 80%, #f11515 85%, transparent 90%)`,
          }}
        />
      </div>
      <div className="absolute inset-0.5 bg-neutral-900 rounded-lg" />
      <span className="relative text-white">{children}</span>
    </button>
  );
}