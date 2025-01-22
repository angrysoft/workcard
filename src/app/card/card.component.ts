import { Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  card = input.required<string>();
  month = input.required<number>();
  year = input.required<number>();
  days = signal<number[]>([]);
  months = [
    'styczeń',
    'luty',
    'marzec',
    'kwiecień',
    'maj',
    'czerwiec',
    'lipiec',
    'sierpień',
    'wrzesień',
    'październik',
    'listopad',
    'grudzień',
  ];

  get date() {
    return `${this.months[
      Number(this.month())
    ].toLocaleUpperCase()} ${this.year()}`;
  }

  constructor() {
    effect(() => {
      this.days.set([]);
      const days = new Date(this.year(), this.month() + 1, 0).getDate();
      for (let index = 0; index < days; index++) {
        this.days().push(index + 1);
      }
    });
  }
}
