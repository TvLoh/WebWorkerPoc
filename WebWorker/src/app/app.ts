import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  inputArray = [5, 2, 9, 1, 5, 6];
  sortedArray = signal<number[]>([]);
  status = signal<string>('Warte auf WebWorker/WASM...');
  worker?: Worker;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (typeof Worker !== 'undefined') {
      // Korrekt: Worker mit Pfad zur Worker-Datei erstellen
      this.worker = new Worker(new URL('./quicksort.worker', import.meta.url), { type: 'module' });
      this.worker.onmessage = ({ data }) => {
        if (data.type === 'wasm-ready') {
          this.status.set('WASM geladen!');
          this.cdr.detectChanges(); // Manuelles UI-Update (zoneless)
        }
        if (data.type === 'sorted') {
          this.sortedArray.set(data.array);
          this.status.set('Sortierung abgeschlossen!');
          this.cdr.detectChanges(); // Manuelles UI-Update (zoneless)
        }
      };
    } else {
      this.status.set('WebWorker werden nicht unterstützt!');
      this.cdr.detectChanges();
    }
  }

  sortArray() {
    if (this.worker) {
      this.status.set('Sortiere...');
      this.cdr.detectChanges();
      this.worker.postMessage({ type: 'sort', array: this.inputArray });
    }
  }

  protected readonly Number = Number;
}
