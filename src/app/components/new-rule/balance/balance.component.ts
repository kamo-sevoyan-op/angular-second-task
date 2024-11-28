import { Component, input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { CoupledInputComponent } from '../coupled-input/coupled-input.component';
import { ConditionalBalanceComponent } from './conditional-balance/conditional-balance.component';
import { ExtendBalanceComponent } from './extend-balance/extend-balance.component';
export type Option = { name: string; value: string };

@Component({
  selector: 'app-balance',
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
    ConditionalBalanceComponent,
    ExtendBalanceComponent,
  ],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css',
})
export class BalanceInputComponent implements OnInit {
  formGroupName = input.required<string>();
  form!: FormGroup;

  balanceUnitOptions: Option[];
  frequencyOptions: Option[];

  entitledValue = input.required<string | null>();

  constructor(private rootFormGroup: FormGroupDirective) {
    this.balanceUnitOptions = [
      { name: 'Days', value: 'days' },
      { name: 'Years', value: 'years' },
      { name: 'Months', value: 'months' },
    ];

    this.frequencyOptions = [
      { name: 'Yearly', value: 'yearly' },
      { name: 'Monthly', value: 'monthly' },
      { name: 'Once', value: 'once' },
    ];
  }

  ngOnInit() {
    this.form = this.rootFormGroup.control.get(
      this.formGroupName()
    ) as FormGroup;

    this.form.get('conditionalCheckBox')?.valueChanges.subscribe((value) => {
      const control = this.form.get('conditional');
      if (!value) {
        control?.reset();
        control?.disable();
      } else {
        control?.enable();
      }
    });

    this.form.get('extendCheckBox')?.valueChanges.subscribe((value) => {
      const control = this.form.get('extend');
      if (!value) {
        control?.reset();
        control?.disable();
      } else {
        control?.enable();
      }
    });
  }
}
