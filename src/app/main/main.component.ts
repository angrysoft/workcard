import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CardsComponent } from '../cards/cards.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-main',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    CardsComponent,
    MatSlideToggleModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class MainComponent {
  cards = signal<string[]>([]);
  date = new Date();

  settingForm: FormGroup<SettingForm>;
  constructor() {
    this.settingForm = new FormGroup<SettingForm>({
      month: new FormControl(this.date.getMonth(), Validators.required),
      year: new FormControl(this.date.getFullYear(), Validators.required),
      cards: new FormControl(null, Validators.required),
      empty: new FormControl(false),
    });
  }

  get month() {
    return this.settingForm.controls.month.value ?? this.date.getMonth();
  }

  get year() {
    return this.settingForm.controls.year.value ?? this.date.getFullYear();
  }

  generate() {
    if (this.settingForm.controls.empty.value) {
      this.cards.set(['']);
      return;
    }
    if (this.settingForm.valid && this.settingForm.controls.cards.value) {
      this.cards.set(this.settingForm.controls.cards.value.split(','));
    }
  }

  print() {
    window.print();
  }

  clear() {
    this.cards.set([]);
    this.settingForm.controls.empty.setValue(false);
    this.settingForm.controls.cards.reset();
  }
}

interface SettingForm {
  month: FormControl<number | null>;
  year: FormControl<number | null>;
  cards: FormControl<string | null>;
  empty: FormControl<boolean | null>;
}
