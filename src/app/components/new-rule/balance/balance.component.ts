import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { CoupledInputComponent } from '../coupled-input/coupled-input.component';
export type Option = { name: string; value: string };

@Component({
  selector: 'app-balance-input',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatOption,
    MatSelect,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CoupledInputComponent,
  ],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css',
})
export class BalanceInputComponent {
  formGroup = input.required<
    FormGroup<{
      balance: FormGroup<{
        value: FormControl<number | null>;
        unit: FormControl<string | null>;
      }>;

      conditionalCheckBox: FormControl<boolean | null>;

      conditional: FormGroup<{
        conditionType: FormControl<string | null>;
        conditionalBalance: FormGroup<{
          value: FormControl<number | null>;
          unit: FormControl<string | null>;
        }>;
        balance: FormGroup<{
          value: FormControl<number | null>;
          unit: FormControl<string | null>;
        }>;
      }>;

      extendCheckBox: FormControl<boolean | null>;

      extend: FormGroup<{
        balance: FormGroup<{
          value: FormControl<number | null>;
          unit: FormControl<string | null>;
        }>;
      }>;

      canBeOveridden: FormControl<boolean | null>;

      frequency: FormGroup<{
        frequency: FormControl<string | null>;
        start: FormControl<Date | null>;
      }>;
    }>
  >();

  balanceUnitOptions: Option[];
  conditionTypeOptions: Option[];
  frequencyOptions: Option[];

  entitledValue = input.required<string | null>();

  constructor() {
    this.balanceUnitOptions = [
      { name: 'Days', value: 'days' },
      { name: 'Years', value: 'years' },
      { name: 'Months', value: 'months' },
    ];

    this.conditionTypeOptions = [
      { name: 'Greather than', value: 'greather-than' },
      { name: 'Lesser than', value: 'lesser-than' },
    ];

    this.frequencyOptions = [
      { name: 'Yearly', value: 'yearly' },
      { name: 'Monthly', value: 'monthly' },
      { name: 'Once', value: 'once' },
    ];
  }
}
