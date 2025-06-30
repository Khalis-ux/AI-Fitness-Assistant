
"use client";
import React, { useEffect, useState } from "react";

type Sparkle = {
  id: number;
  createdAt: number;
  color: string;
  size: number;
  style: React.CSSProperties;
};

export const SparklesCore = (props: {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const {
    id = "tsparticles",
    background = "transparent",
    minSize = 0.4,
    maxSize = 1,
    particleDensity = 1200,
    className,
    particleColor = "#FFFFFF",
  } = props;
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const canvas = document.getElementById(id) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = (canvas.width = canvas.offsetWidth * dpr);
    let h = (canvas.height = canvas.offsetHeight * dpr);

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        w = canvas.width = entry.contentRect.width * dpr;
        h = canvas.height = entry.contentRect.height * dpr;
      }
    });
    resizeObserver.observe(canvas);

    let allSparkles: Sparkle[] = [];

    const draw = () => {
      if (isPaused) return;
      ctx.clearRect(0, 0, w, h);
      allSparkles.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.style.left as number, s.style.top as number, s.size * dpr, 0, 2 * Math.PI, false);
        ctx.fillStyle = s.color;
        ctx.fill();
      });
    };

    const update = () => {
      if (isPaused) return;

      const now = Date.now();
      allSparkles.forEach(s => {
        const life = now - s.createdAt;
        if (life > 3000) {
          allSparkles = allSparkles.filter(s_ => s_.id !== s.id);
        } else {
          const opacity = 1 - life / 3000;
          s.color = `rgba(${parseInt(particleColor.slice(1, 3), 16)}, ${parseInt(particleColor.slice(3, 5), 16)}, ${parseInt(particleColor.slice(5, 7), 16)}, ${opacity})`;
        }
      });

      if (allSparkles.length < (w * h) / (particleDensity * dpr)) {
        allSparkles.push({
          id: Date.now() + Math.random(),
          createdAt: now,
          color: particleColor,
          size: Math.random() * (maxSize - minSize) + minSize,
          style: {
            left: Math.random() * w,
            top: Math.random() * h,
          },
        });
      }
    };
    
    const animate = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [id, minSize, maxSize, particleDensity, particleColor, isPaused]);


  return (
    <canvas
      id={id}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        background: background,
      }}
      className={className}
    ></canvas>
  );
};
