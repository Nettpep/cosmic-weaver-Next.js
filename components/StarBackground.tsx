'use client';

import React, { useEffect, useRef } from 'react';

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    interface Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speed: number;
    }

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string; // "r,g,b" string
      alpha: number;
      pulsePhase: number;
    }

    const stars: Star[] = [];
    const particles: Particle[] = [];

    // Initialize Background Stars (Vertical scrolling)
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    // Initialize Mystical Particles (Drifting & Glowing)
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '255, 215, 0' : '176, 38, 255', // Gold or Purple
        alpha: Math.random() * 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = {
            x: e.clientX,
            y: e.clientY
        };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Draw Stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });

      // Particle Interactions (Repulsion/Attraction + Mouse)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // 1. Mouse Interaction (Repulsion)
        const dxMouse = mouseRef.current.x - p1.x;
        const dyMouse = mouseRef.current.y - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        const mouseRadius = 250;

        if (distMouse < mouseRadius) {
            const force = (mouseRadius - distMouse) / mouseRadius; // 0 to 1
            const strength = 0.08; 
            const angle = Math.atan2(dyMouse, dxMouse);
            
            // Push away from mouse
            p1.vx -= Math.cos(angle) * force * strength;
            p1.vy -= Math.sin(angle) * force * strength;
        }

        // 2. Particle-Particle Interaction
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Interaction Radius
            const maxDist = 150;
            
            if (dist < maxDist) {
                const nx = dx / dist;
                const ny = dy / dist;

                // Force calculation: 
                // Close range: Repel strongly
                // Medium range: Gently attract
                let force = 0;
                if (dist < 60) {
                    force = -0.05 * (1 - dist / 60); // Negative = Repel
                } else {
                    force = 0.005 * ((150 - dist) / 150); // Positive = Attract
                }

                p1.vx += nx * force;
                p1.vy += ny * force;
                p2.vx -= nx * force;
                p2.vy -= ny * force;

                // Draw constellation lines
                if (dist > 60 && dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    const opacity = (1 - Math.abs(dist - 90) / 30) * 0.15; 
                    if (opacity > 0) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.stroke();
                    }
                }
            }
        }
      }

      // Draw Particles & Update Physics
      particles.forEach((p) => {
        // Add random wandering force
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;

        // Friction/Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Speed Limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 2.0;
        if (speed > maxSpeed) {
            p.vx = (p.vx / speed) * maxSpeed;
            p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        const buffer = 50;
        if (p.x < -buffer) p.x = width + buffer;
        if (p.x > width + buffer) p.x = -buffer;
        if (p.y < -buffer) p.y = height + buffer;
        if (p.y > height + buffer) p.y = -buffer;

        // Visuals
        const pulse = (Math.sin(time + p.pulsePhase) + 1) / 2;
        const currentAlpha = 0.1 + (pulse * 0.5); 

        const glowRadius = p.radius * 4;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        gradient.addColorStop(0, `rgba(${p.color}, ${currentAlpha})`);
        gradient.addColorStop(1, `rgba(${p.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
};

export default StarBackground;