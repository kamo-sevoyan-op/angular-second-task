import {
  Component,
  inject,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CoupledInputComponent } from './coupled-input/coupled-input.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

export type Option = { name: string; value: string };

@Component({
  selector: 'app-new-rule',
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
    CoupledInputComponent,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './new-rule.component.html',
  styleUrl: './new-rule.component.css',
})
export class NewRuleComponent {
  private formBuilder = inject(FormBuilder);
  unitOptions: Option[];
  genderOptions: Option[];
  balaceUnitOptions: Option[];
  conditionTypeOptions: Option[];
  frequencyOptions: Option[];
  consumptionOptions: Option[];

  frequencyNumberOptions: Option[];

  entitledValue = signal<string>('');

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

    this.balaceUnitOptions = [
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

    this.consumptionOptions = [
      { name: 'Accural', value: 'accural' },
      { name: 'Accumulative', value: 'accumulative' },
    ];

    this.frequencyNumberOptions = [
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
    ];
  }
  ruleForm = this.formBuilder.group({
    name: ['', Validators.required],
    type: [''],
    entitled: [{ value: '', disabled: true }],
    docsRequired: this.formBuilder.control<boolean | null>(null, [
      Validators.required,
    ]),
    gracePeriod: this.formBuilder.control<boolean | null>(null, [
      Validators.required,
    ]),
    dispute: this.formBuilder.control<boolean | null>(null, [
      Validators.required,
    ]),
    validity: [''],

    unit: ['', Validators.required],
    gender: ['', Validators.required],
    employementType: ['', Validators.required],

    dynamicInputs: this.formBuilder.array([]),
  });

  onSubmit() {}

  changeFormState() {
    if (this.ruleForm.controls.type.value === 'not-paid') {
      this.ruleForm.controls.entitled.disable();
      this.ruleForm.controls.entitled.setValue(null);
      this.entitledValue.set('');
    } else {
      this.ruleForm.controls.entitled.enable();
    }
  }

  entitledChanged() {
    this.entitledValue.set(this.ruleForm.controls.entitled.value ?? '');
  }
}
