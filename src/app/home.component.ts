import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div>Count: {{ this.countValue }}</div>
    <div>Count Signal: {{ count() }}</div>
    <div>Double: {{ this.doubleValue }}</div>
    <div>Double Signal: {{ double() }}</div>
    <div>Double RxJS: {{ double$ | async }}</div>
    <button mat-raised-button color="primary" (click)="changeCount()">Change</button>
    <button mat-raised-button color="accent" (click)="increaseCount()">Increase</button>
  `,
  imports: [CommonModule, MatButtonModule],
})
export class HomeComponent {

  countValue = 0;
  doubleValue = this.countValue * 2; //Nao funciona

  count = signal(0);
  count$ = new BehaviorSubject(0);

  //Signals - Sync Reactivity
  //RxJS - Async Reactivity

  double = computed(() => this.count() * 2); //Acessa o valor direto sem subscribe ou AsyncPipe
  double$ = this.count$.pipe(
    map(count => count * 2)
  );

  changeCount() {
    this.countValue = 5; //ZoneJS
    this.count.set(5); //Signal
    this.count$.next(5); //RxJS
  }

  increaseCount() {
    this.countValue++;
    this.count.update(c => c + 1);
    this.count$.next(this.count$.getValue() + 1);
  }
}
