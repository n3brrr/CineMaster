'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedShinyText({ children, className }: AnimatedShinyTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.to(textRef.current, {
      backgroundPosition: '200% center',
      duration: 4,
      repeat: -1,
      ease: 'power1.inOut',
      repeatDelay: 2,
    });
  }, []);

 return (
    <h2
        ref={textRef}
        className={`inline-block bg-gradient-to-r from-white via-white/40 to-white bg-[length:200%_auto] bg-clip-text text-transparent text-[40px] font-bold mb-5 ${className}`}
    >
        {children}
    </h2>
    );
}