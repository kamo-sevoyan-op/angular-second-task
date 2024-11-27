import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';

export type Option = { name: string; value: string };

@Component({
  selector: 'app-basic-info',
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
  ],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.css',
})
export class BasicInfoComponent {
  formGroup = input.required<FormGroup>();

  unitOptions: Option[];
  genderOptions: Option[];
  consumptionOptions: Option[];
  employmentTypeOptions: Option[];

  constructor() {
    this.unitOptions = [
      { name: 'Days', value: 'days' },
      { name: 'Hours', value: 'hours' },
      { name: 'Days & Hours', value: 'days-and-hours' },
    ];

    this.genderOptions = [
      { name: 'Male', value: 'male' },
      { name: 'Female', value: 'female' },
      { name: 'All', value: 'all' },
      { name: 'Other', value: 'other' },
    ];

    this.consumptionOptions = [
      { name: 'Accural', value: 'accural' },
      { name: 'Accumulative', value: 'accumulative' },
    ];

    this.employmentTypeOptions = [
      { name: 'Full Time', value: 'full-time' },
      { name: 'Part Time', value: 'part-time' },
    ];
  }
}
