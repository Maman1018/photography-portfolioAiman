import React, { useRef, useEffect, useState } from 'react';

const DustEffect = ({
  children,
  isVisible,
  className = '',
  onComplete
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isExploding, setIsExploding] = useState(false);
  const [showText, setShowText] = useState(true);

  // --- PHYSICS CONFIGURATION ---
  const config = {
    particleSize: 2,
    reductionFactor: 2,
    duration: 5000,       // ~15 seconds (Long lingering)

    // Initial Explosion
    speed: 1,          // Moderate burst speed

    // The "Float" Feel
    gravity: -0.03,      // Very tiny upward pull (Anti-gravity)
    drag: 0.96,          // Friction: slows them down quickly after burst
    jitter: 0.50         // Air currents: random wiggling while floating
  };

  useEffect(() => {
    if (!isVisible && !isExploding && containerRef.current) {
      explode();
    }
  }, [isVisible]);

  const explode = () => {
    setIsExploding(true);
    const container = containerRef.current;
    if (!container) return;

    // Safety check
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
        setShowText(false);
        return;
    }

    // 1. SETUP FULL SCREEN CANVAS (Fixed Position)
    // This breaks the particles out of the text box so they can cover the screen
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    Object.assign(canvas.style, {
      position: 'fixed',
      top: '0px',
      left: '0px',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 9999 // Float above everything
    });

    const ctx = canvas.getContext('2d');

    // 2. DRAW TEXT (Snapshot)
    // We calculate exactly where the text IS on screen right now
    const computedStyle = window.getComputedStyle(container.firstChild);
    ctx.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
    ctx.fillStyle = computedStyle.color;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    ctx.fillText(container.innerText, centerX, centerY);

    // 3. GENERATE PARTICLES
    const particles = [];
    // We only scan the area where the text actually is
    const buffer = 20;
    const scanLeft = Math.floor(Math.max(0, rect.left - buffer));
    const scanTop = Math.floor(Math.max(0, rect.top - buffer));
    const scanWidth = Math.ceil(Math.min(window.innerWidth - scanLeft, rect.width + buffer * 2));
    const scanHeight = Math.ceil(Math.min(window.innerHeight - scanTop, rect.height + buffer * 2));

    const imageData = ctx.getImageData(scanLeft, scanTop, scanWidth, scanHeight);
    const data = imageData.data;

    for (let y = 0; y < scanHeight; y += config.reductionFactor) {
      for (let x = 0; x < scanWidth; x += config.reductionFactor) {
        const index = (y * scanWidth + x) * 4;
        const alpha = data[index + 3];

        if (alpha > 0) {
          particles.push({
            // Absolute screen position
            x: scanLeft + x,
            y: scanTop + y,

            // Initial burst velocity (Explosion)
            vx: (Math.random() - 0.5) * config.speed * 40,
            vy: ((Math.random() - 0.5) * config.speed * 25),

            // Life properties
            life: Math.random() * (config.duration * 0.8) + (config.duration * 0.8),
            maxLife: config.duration,
            color: `rgba(${data[index]}, ${data[index+1]}, ${data[index+2]}`
          });
        }
      }
    }

    // Clear the snapshot so we see only particles
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setShowText(false);

    // 4. ANIMATION LOOP
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeParticles = 0;

      particles.forEach(p => {
        if (p.life > 0) {
          activeParticles++;

          // --- THE FLOATING PHYSICS ---

          // 1. Apply Jitter (Random Air Currents)
          // This makes them "wander" instead of flying in straight lines
          p.vx += (Math.random() - 0.5) * config.jitter;
          p.vy += (Math.random() - 0.5) * config.jitter;

          // 2. Apply Drag (Air Resistance)
          // This slows down the explosion quickly so they start floating
          p.vx *= config.drag;
          p.vy *= config.drag;

          // 3. Apply Gravity (Slow Rise)
          p.vy += config.gravity;

          // 4. Move
          p.x += p.vx;
          p.y += p.vy;

          p.life--;

          // 5. Draw
          const opacity = Math.pow(p.life / p.maxLife, 0.5); // Smooth fade
          ctx.fillStyle = `${p.color}, ${opacity})`;
          ctx.fillRect(p.x, p.y, config.particleSize, config.particleSize);
        }
      });

      if (activeParticles > 0) {
        requestAnimationFrame(animate);
      } else {
        if (onComplete) onComplete();
      }
    };

    animate();
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <div style={{ opacity: showText ? 1 : 0, transition: 'none' }}>
        {children}
      </div>

      <canvas
        ref={canvasRef}
        style={{
          opacity: isExploding ? 1 : 0
        }}
      />
    </div>
  );
};

export default DustEffect;