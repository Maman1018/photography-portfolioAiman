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

  const config = {
    particleSize: 2,
    reductionFactor: 2,
    duration: 5000,
    speed: 1,
    gravity: -0.03,
    drag: 0.96,
    jitter: 0.08
  };

  useEffect(() => {
    if (!isVisible && !isExploding && containerRef.current) {
      explode();
    }
  }, [isVisible]);

  // --- UPDATED HELPER: Draws text starting from the TOP ---
  const drawWrappedText = (ctx, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '';
    const lines = [];

    // 1. Calculate lines based on maxWidth
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
        lines.push(line);
        line = words[i] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // 2. Draw lines flowing from Top to Bottom
    // We removed the vertical centering logic to match HTML flow
    lines.forEach((l, index) => {
      ctx.fillText(l.trim(), x, y + (index * lineHeight));
    });
  };

  const explode = () => {
    setIsExploding(true);
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
        setShowText(false);
        return;
    }

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
      zIndex: 9999
    });

    const ctx = canvas.getContext('2d');

    // --- CRITICAL FIXES FOR STYLE MATCHING ---
    const computedStyle = window.getComputedStyle(container.firstChild || container);

    // 1. Font & Color
    ctx.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
    ctx.fillStyle = computedStyle.color;

    // 2. Letter Spacing (Crucial for Trajan Pro)
    // Canvas defaults to 0px spacing, which breaks wrapping calculations
    const spacing = computedStyle.letterSpacing;
    if (spacing && spacing !== 'normal') {
        ctx.letterSpacing = spacing;
    }

    // 3. Alignment Strategy
    // We switch to 'top' baseline to match how HTML renders text blocks
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';

    // 4. Calculate Dimensions
    // We subtract padding to get the true "content box" for text wrapping
    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
    const paddingTop = parseFloat(computedStyle.paddingTop) || 0;

    const contentWidth = rect.width - paddingLeft - paddingRight;

    // Start X: Center of the content box (since text-align is center)
    const startX = rect.left + paddingLeft + (contentWidth / 2);

    // Start Y: Top of the content box (plus padding)
    const startY = rect.top + paddingTop;

    // Calculate Line Height
    const fontSize = parseFloat(computedStyle.fontSize);
    let lineHeight = parseFloat(computedStyle.lineHeight);
    if (isNaN(lineHeight)) lineHeight = fontSize * 1.2;

    // --- DRAW SNAPSHOT ---
    drawWrappedText(ctx, container.innerText, startX, startY, contentWidth, lineHeight);

    // --- GENERATE PARTICLES ---
    const particles = [];
    const buffer = 50;
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
            x: scanLeft + x,
            y: scanTop + y,
            vx: (Math.random() - 0.5) * config.speed * 50,
            vy: (Math.random() - 0.5) * config.speed * 30,
            life: Math.random() * (config.duration * 0.5) + (config.duration * 0.5),
            maxLife: config.duration,
            color: `rgba(${data[index]}, ${data[index+1]}, ${data[index+2]}`
          });
        }
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setShowText(false);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeParticles = 0;

      particles.forEach(p => {
        if (p.life > 0) {
          activeParticles++;
          p.vx += (Math.random() - 0.5) * config.jitter;
          p.vy += (Math.random() - 0.5) * config.jitter;
          p.vx *= config.drag;
          p.vy *= config.drag;
          p.vy += config.gravity;
          p.x += p.vx;
          p.y += p.vy;
          p.life--;

          const opacity = Math.pow(p.life / p.maxLife, 0.5);
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
      style={{ position: 'relative', display: 'inline-block', width: '100%' }}
    >
      <div style={{ opacity: showText ? 1 : 0, transition: 'none' }}>
        {children}
      </div>

      <canvas
        ref={canvasRef}
        style={{ opacity: isExploding ? 1 : 0 }}
      />
    </div>
  );
};

export default DustEffect;