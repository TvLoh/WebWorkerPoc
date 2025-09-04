import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-click-visualizer',
  template: '',
  standalone: true,
  styles: [`
    .click-circle {
      position: fixed;
      width: 20px;
      height: 20px;
      background: rgba(0, 150, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      animation: fadeOut 0.6s forwards;
      z-index: 9999;
    }

    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(2);
      }
    }
  `]
})
export class ClickVisualizerComponent {
  constructor(private readonly renderer: Renderer2) {
    this.renderer.listen('document', 'click', (event: MouseEvent) => {
      this.showClick(event.clientX, event.clientY);
    });
  }

  showClick(x: number, y: number) {
    const circle = this.renderer.createElement('div');
    this.renderer.addClass(circle, 'click-circle');
    this.renderer.setStyle(circle, 'left', `${x}px`);
    this.renderer.setStyle(circle, 'top', `${y}px`);
    this.renderer.appendChild(document.body, circle);

    setTimeout(() => {
      this.renderer.removeChild(document.body, circle);
    }, 300);
  }
}
