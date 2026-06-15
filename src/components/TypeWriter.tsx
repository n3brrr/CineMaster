'use client';

import { useEffect, useRef, useState } from 'react';

const PHRASES = [
  'Search for your favorite movies...',
  'Discover new releases...',
  'Find the best rated films...',
  'Explore by genre...',
];

export default function TypeWriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const phrase = PHRASES[phraseIndex];
    let i = 0;
    setDisplayed('');

    const type = () => {
      if (i <= phrase.length) {
        setDisplayed(phrase.slice(0, i));
        i++;
        timeoutRef.current = setTimeout(type, 70);
      } else {
        timeoutRef.current = setTimeout(() => {
          erase(phrase.length);
        }, 3000);
      }
    };

    const erase = (len: number) => {
      if (len >= 0) {
        setDisplayed(phrase.slice(0, len));
        len--;
        timeoutRef.current = setTimeout(() => erase(len), 30);
      } else {
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }
    };

    type();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phraseIndex]);

  return (
    <span className="text-white/60">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}