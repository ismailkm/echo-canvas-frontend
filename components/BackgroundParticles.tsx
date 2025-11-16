'use client'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const colors = ['#A3B8A2', '#F59E0B']; // Sage Green and Amber

const BackgroundParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on client to avoid hydration mismatch
    const generatedParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 50 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 20, // 20-40 seconds
      delay: Math.random() * 10,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full filter blur-3xl"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: 0,
          }}
          animate={{
            x: [`${p.x}vw`, `${p.x + (Math.random() - 0.5) * 20}vw`],
            y: [`${p.y}vh`, `${p.y + (Math.random() - 0.5) * 20}vh`],
            opacity: [0, 0.15, 0.1, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundParticles;