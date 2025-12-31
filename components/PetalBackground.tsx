
import React, { useEffect, useRef } from 'react';

const PetalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];
    const petalCount = 45;

    class Petal {
      x: number = 0;
      y: number = 0;
      w: number = 0;
      h: number = 0;
      opacity: number = 0;
      flip: number = 0;
      xSpeed: number = 0;
      ySpeed: number = 0;
      flipSpeed: number = 0;

      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height - canvas!.height;
        this.w = 10 + Math.random() * 15;
        this.h = 10 + Math.random() * 10;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.flip = Math.random();
        this.xSpeed = 0.5 + Math.random() * 2;
        this.ySpeed = 1 + Math.random() * 1.5;
        this.flipSpeed = Math.random() * 0.03;
      }

      update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.flip += this.flipSpeed;

        if (this.y > canvas!.height) {
          this.init();
          this.y = -20;
        }
        if (this.x > canvas!.width) {
          this.x = -20;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        ctx.rotate(this.flip * Math.PI);
        ctx.beginPath();
        ctx.ellipse(0, 0, this.w / 2, this.h / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 182, 193, ${this.opacity})`;
        ctx.fill();
        ctx.restore();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createPetals = () => {
      petals = [];
      for (let i = 0; i < petalCount; i++) {
        petals.push(new Petal());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    createPetals();
    window.addEventListener('resize', () => {
      resize();
      createPetals();
    });
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 opacity-60"
    />
  );
};

export default PetalBackground;
