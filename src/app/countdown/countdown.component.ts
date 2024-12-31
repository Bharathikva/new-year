import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CountdownModule } from 'ngx-countdown';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CountdownModule, MatCardModule, MatButtonModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="countdown-container">
      <mat-card class="countdown-card">
        <h1 class="title">🎆 Countdown to 2025 🎆</h1>
        <div class="countdown-timer">
          <div class="time-box" *ngFor="let time of timeParts">
            <p class="time-value">{{ time.value }}</p>
            <p class="time-label">{{ time.label }}</p>
          </div>
        </div>
        <ngx-countdown [config]="countdownConfig" (finished)="onCountdownEnd()"></ngx-countdown>
        <button mat-raised-button color="accent" (click)="celebrate()">Celebrate 🎉</button>
      </mat-card>
      <canvas id="fireworks" class="fireworks-canvas"></canvas>
    </div>
  `,
  styleUrls: ['./countdown.component.css'],
})
export class CountdownComponent {
  countdownConfig = { leftTime: this.calculateTimeLeftInSeconds(), format: 'DD:HH:mm:ss' };
  timeParts: { value: number; label: string }[] = [];
  private interval: any;

  ngOnInit() {
    this.updateTimeParts(); // Initialize time parts
    this.interval = setInterval(() => this.updateTimeParts(), 1000); // Update every second
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval); // Clear interval
  }

  calculateTimeLeftInSeconds() {
    const newYear = new Date('2025-01-01T00:00:00').getTime();
    const now = Date.now();
    return Math.max((newYear - now) / 1000, 0);
  }

  updateTimeParts() {
    const totalSeconds = this.calculateTimeLeftInSeconds();
    this.timeParts = [
      { value: Math.floor(totalSeconds / (24 * 3600)), label: 'Days' },
      { value: Math.floor((totalSeconds % (24 * 3600)) / 3600), label: 'Hours' },
      { value: Math.floor((totalSeconds % 3600) / 60), label: 'Minutes' },
      { value: Math.floor(totalSeconds % 60), label: 'Seconds' },
    ];
  }

  onCountdownEnd() {
    alert('Happy New Year 2025! 🎆');
    this.launchFireworks();
  }

  celebrate() {
    this.launchFireworks();
  }

  launchFireworks() {
    const canvas = document.getElementById('fireworks') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFC300', '#DAF7A6'];
    const fireworks: any[] = [];

    const random = (min: number, max: number) => Math.random() * (max - min) + min;
    const hexToRgb = (hex: string) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r},${g},${b}`;
    };

    const createFirework = () => ({
      x: random(100, canvas.width - 100),
      y: canvas.height,
      targetX: random(100, canvas.width - 100),
      targetY: random(50, canvas.height / 2),
      size: random(2, 4),
      speed: random(3, 6),
      color: colors[Math.floor(random(0, colors.length))],
      particles: [],
    });

    const createParticles = (firework: any) => {
      for (let i = 0; i < 50; i++) {
        firework.particles.push({
          x: firework.targetX,
          y: firework.targetY,
          size: random(1, 3),
          color: firework.color,
          angle: random(0, Math.PI * 2),
          speed: random(1, 3),
          alpha: 1,
        });
      }
    };

    const drawParticle = (particle: any) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.alpha})`;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireworks.forEach((firework, index) => {
        if (!firework.particles.length) {
          firework.y -= firework.speed;
          if (firework.y <= firework.targetY) {
            createParticles(firework);
          }
        } else {
          firework.particles.forEach((particle: any, idx: any) => {
            particle.x += Math.cos(particle.angle) * particle.speed;
            particle.y += Math.sin(particle.angle) * particle.speed;
            particle.alpha -= 0.02;
            if (particle.alpha <= 0) firework.particles.splice(idx, 1);
          });
        }

        if (firework.particles.length === 0 && firework.y <= firework.targetY) {
          fireworks.splice(index, 1);
        }

        firework.particles.forEach(drawParticle);
      });

      if (fireworks.length < 7) {
        fireworks.push(createFirework());
      }

      requestAnimationFrame(animate);
    };

    animate();
  }
}
