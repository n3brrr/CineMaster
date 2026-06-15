'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  active: boolean;
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars: Star[] = Array.from({ length: 500 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.2,
      opacity: Math.random() * 0.6 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    const comets: Comet[] = [
      { x: 0, y: 0, vx: 0, vy: 0, length: 0, opacity: 0, active: false },
      { x: 0, y: 0, vx: 0, vy: 0, length: 0, opacity: 0, active: false },
    ];

    const spawnComet = (comet: Comet) => {
      comet.x = Math.random() * canvas.width;
      comet.y = Math.random() * canvas.height * 0.5;
      comet.vx = Math.random() * 4 + 3;
      comet.vy = Math.random() * 2 + 1;
      comet.length = Math.random() * 120 + 80;
      comet.opacity = 1;
      comet.active = true;
    };

    const cometTimers = comets.map((_, i) =>
      setTimeout(() => spawnComet(comets[i]), Math.random() * 5000 + 3000 * i)
    );

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const opacity = star.opacity + twinkle * 0.15;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, opacity))})`;
        ctx.fill();
      });

      comets.forEach((comet) => {
        if (!comet.active) return;

        comet.x += comet.vx;
        comet.y += comet.vy;
        comet.opacity -= 0.008;

        if (comet.opacity <= 0 || comet.x > canvas.width || comet.y > canvas.height) {
          comet.active = false;
          setTimeout(() => spawnComet(comet), Math.random() * 8000 + 5000);
          return;
        }

        const angle = Math.atan2(comet.vy, comet.vx);
        const tailX = comet.x - Math.cos(angle) * comet.length;
        const tailY = comet.y - Math.sin(angle) * comet.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, comet.x, comet.y);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(0.7, `rgba(220, 180, 255, ${comet.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${comet.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(comet.x, comet.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${comet.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      cometTimers.forEach(clearTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-black"
    />
  );
}