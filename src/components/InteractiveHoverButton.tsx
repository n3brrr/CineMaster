import { useRef } from 'react';
import gsap from 'gsap';

interface InteractiveHoverButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export default function InteractiveHoverButton({
  onClick,
  children,
}: InteractiveHoverButtonProps) {
  const arrowRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    gsap.to(arrowRef.current, {
      opacity: 1,
      x: 6,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(arrowRef.current, {
      opacity: 0,
      x: -6,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="text-white bg-linear-to-r from-red-500/60 to-red-900/60 rounded-lg p-2 px-10 hover:scale-105 transition-all duration-300 relative flex items-center gap-2">
      {children}
      <span
        ref={arrowRef}
        className="opacity-0 -translate-x-1.5"
      >
        →
      </span>
    </button>
  );
}