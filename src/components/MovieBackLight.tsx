import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { Movie } from '../hooks/movie';

interface MovieBacklightProps {
  movie: Movie;
}

export default function MovieBacklight({ movie }: MovieBacklightProps) {
  const backlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      gsap.to(backlightRef.current, {
        opacity: 1,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(backlightRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    const parent = backlightRef.current?.parentElement;
    if (parent) {
      parent.addEventListener('mouseenter', handleMouseEnter);
      parent.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        parent.removeEventListener('mouseenter', handleMouseEnter);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div
      ref={backlightRef}
      className="absolute inset-0 -z-10 rounded-lg opacity-0 scale-80 blur-2xl"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
}