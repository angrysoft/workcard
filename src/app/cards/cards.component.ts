import { Component, input } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-cards',
  imports: [CardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  cards = input.required<string[]>();
  month = input.required<number>();
  year = input.required<number>();
}
