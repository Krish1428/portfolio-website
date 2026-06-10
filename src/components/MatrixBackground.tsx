import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  color?: string; // e.g. '#00FF41' or '#00A3FF'
  speed?: number; // lower is faster
  fontSize?: number;
}

export const MatrixBackground: React.FC<MatrixBackgroundProps> = ({
  color = '#00FF41',
  speed = 35,
  fontSize = 14,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters definition (cyberpunk, hiragana + latin + digits)
    const chars = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ*#$@%&+-=<>:;[]{}';
    const charArray = chars.split('');

    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(columns).fill(1).map(() => Math.floor(Math.random() * -30));

    const draw = () => {
      // Re-evaluate columns if size changed
      const currentColumns = Math.floor(canvas.width / fontSize);
      if (currentColumns !== drops.length) {
        columns = currentColumns;
        const oldDrops = [...drops];
        drops = Array(columns).fill(1).map((_, i) => oldDrops[i] !== undefined ? oldDrops[i] : Math.floor(Math.random() * -30));
      }

      ctx.fillStyle = 'rgba(2, 2, 3, 0.15)'; // trail effect matching pure sophisticated dark #020203
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Randomly pick a character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw with some glow effect
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff'; // occasional bright leading raindrop
        } else {
          ctx.fillStyle = color;
        }

        ctx.fillText(text, x, y);

        // Reset drop top if it reaches bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, speed);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [color, speed, fontSize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-15 mix-blend-screen"
      style={{ filter: 'blur(0.5px)' }}
      id="matrix-rain-canvas"
    />
  );
};
