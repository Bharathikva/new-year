import { Component } from '@angular/core';

@Component({
  selector: 'app-celebration',
  standalone: true,
  imports: [],
  template: `
    <div class="celebration-container">
      <h2>🎆 Celebrate with Fireworks! 🎇</h2>
      <canvas id="fireworks" width="800" height="600"></canvas>
    </div>
  `,
  styleUrls: ['./celebration.component.css'],
})
export class CelebrationComponent {
  ngAfterViewInit() {
    this.launchFireworks();
  }

  launchFireworks() {
    const canvas = document.getElementById('fireworks') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const fireworks: any = [];
    const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFC300', '#DAF7A6'];

    // Utility functions
    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const createFirework = () => {
      return {
        x: canvas.width / 2,
        y: canvas.height,
        targetX: random(100, canvas.width - 100),
        targetY: random(50, canvas.height / 2),
        size: random(2, 4),
        speed: random(2, 5),
        color: colors[Math.floor(random(0, colors.length))],
        explode: false,
        particles: [],
      };
    };

    const createParticles = (firework: any) => {
      for (let i = 0; i < 30; i++) {
        firework.particles.push({
          x: firework.targetX,
          y: firework.targetY,
          size: firework.size,
          color: firework.color,
          speed: random(1, 3),
          angle: random(0, Math.PI * 2),
          alpha: 1,
        });
      }
    };

    const updateParticles = (particles: any[]) => {
      particles.forEach((particle, index) => {
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.alpha -= 0.02;

        if (particle.alpha <= 0) particles.splice(index, 1);
      });
    };

    const drawFirework = (firework: any) => {
      ctx.beginPath();
      ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
      ctx.fillStyle = firework.color;
      ctx.fill();
      ctx.closePath();
    };

    const drawParticle = (particle: any) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.alpha})`;
      ctx.fill();
      ctx.closePath();
    };

    const hexToRgb = (hex: string) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r},${g},${b}`;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fireworks.forEach((firework: any, index: any) => {
        if (!firework.explode) {
          firework.y -= firework.speed;
          firework.x += (firework.targetX - firework.x) / 20;

          if (Math.abs(firework.y - firework.targetY) < 10) {
            firework.explode = true;
            createParticles(firework);
          }

          drawFirework(firework);
        } else {
          updateParticles(firework.particles);
          firework.particles.forEach(drawParticle);

          if (firework.particles.length === 0) {
            fireworks.splice(index, 1);
          }
        }
      });

      if (fireworks.length < 5) {
        fireworks.push(createFirework());
      }

      requestAnimationFrame(animate);
    };

    animate();
  }
}
