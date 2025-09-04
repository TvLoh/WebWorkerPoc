import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickVisualizerComponent } from './shared/ui/klickVisualizer';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ClickVisualizerComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {

  result: WritableSignal<number> = signal(0)
  counter: number = 0
  fibuNumber: number = 45

  incrementCounter() {
    this.counter++
  }

  resetCounter() {
    this.counter = 0
    this.result.set(0)
  }

  calculateWithWorker(input: number) {
    this.result.set(0)
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('./worker.worker.ts', import.meta.url))
      worker.onmessage = ({data}) => {
        this.result.set(data)
        worker.terminate()
      }
      worker.onerror = (error) => console.error('Worker error:', error)
      worker.postMessage(input);
    } else {
      console.error('Web Workers are not supported in this environment.')
    }
  }

  calculateWithoutWorker(number: number) {
    this.result.set(0)
    this.result.set(this.calculateFibonacci(number))
  }

  calculateFibonacci(num: number): number {
    if (num <= 1) return num
    return this.calculateFibonacci(num - 1) + this.calculateFibonacci(num - 2)
  }
}
