"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  size: 2 + (index % 5),
  delay: (index % 7) * 0.42,
  duration: 10 + (index % 9)
}));

export function FloatingParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-200/40 shadow-[0_0_20px_rgba(34,211,238,0.42)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [-16, 24, -16],
            x: [-8, 10, -8],
            opacity: [0.18, 0.72, 0.18],
            scale: [0.9, 1.4, 0.9]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
