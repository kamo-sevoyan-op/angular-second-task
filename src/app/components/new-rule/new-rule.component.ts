import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { BalanceInputComponent } from './balance/balance.component';
import { ConsumptionComponent } from './consumption/consumption.component';

export type Option = { name: string; value: string };

@Component({
  selector: 'app-new-rule',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BasicInfoComponent,
    BalanceInputComponent,
    ConsumptionComponent,
  ],
  templateUrl: './new-rule.component.html',
  styleUrl: './new-rule.component.css',
})
export class NewRuleComponent {
  private formBuilder = inject(FormBuilder);

  entitledValue = signal<string | null>(null);

  constructor() {
    this.ruleForm.get('basicInfo.type')?.valueChanges.subscribe((value) => {
      if (value === 'not-paid') {
        this.ruleForm.get('basicInfo.entitled')?.disable();
        this.ruleForm.get('basicInfo.entitled')?.setValue(null);
      } else {
        this.ruleForm.get('basicInfo.entitled')?.enable();
      }
    });

    this.ruleForm.get('basicInfo.entitled')?.valueChanges.subscribe((value) => {
      this.entitledValue.set(value);

      if (value === 'through-balance') {
        this.switchToFirstState();
      } else if (value === 'event-based') {
        this.switchToSecondState();
      } else {
        this.switchToMainState();
      }
    });

    this.ruleForm
      .get('balance.conditionalCheckBox')
      ?.valueChanges.subscribe((value) => {
        const control = this.ruleForm.get('balance.conditional');

        if (!value) {
          control?.reset();
          control?.disable();
        } else {
          control?.enable();
        }
      });

    this.ruleForm
      .get('balance.extendCheckBox')
      ?.valueChanges.subscribe((value) => {
        const control = this.ruleForm.get('balance.extend');

        if (!value) {
          control?.reset();
          control?.disable();
        } else {
          control?.enable();
        }
      });
  }

  ruleForm = this.formBuilder.group({
    name: this.formBuilder.control<string | null>(null, [Validators.required]),
    basicInfo: this.formBuilder.group({
      type: ['', Validators.required],
      entitled: this.formBuilder.control<string | null>(
        { value: null, disabled: true },
        [Validators.required]
      ),
      docsRequired: this.formBuilder.control<boolean | null>(null, [
        Validators.required,
      ]),
      gracePeriod: this.formBuilder.control<boolean | null>(null, [
        Validators.required,
      ]),
      dispute: this.formBuilder.control<boolean | null>(null, [
        Validators.required,
      ]),
      validity: this.formBuilder.control<string | null>(null, [
        Validators.required,
      ]),
      unit: this.formBuilder.control<string | null>(null, [
        Validators.required,
      ]),
      gender: this.formBuilder.control<string | null>(null, [
        Validators.required,
      ]),
      employementType: this.formBuilder.control<string | null>(null, [
        Validators.required,
      ]),
    }),

    balance: this.formBuilder.group({
      balance: this.formBuilder.group({
        value: [0, Validators.required],
        unit: ['', Validators.required],
      }),

      conditionalCheckBox: this.formBuilder.control<boolean>(false, [
        Validators.required,
      ]),

      conditional: this.formBuilder.group({
        conditionType: ['', Validators.required],
        conditionalBalance: this.formBuilder.group({
          value: [0, Validators.required],
          unit: ['', Validators.required],
        }),

        balance: this.formBuilder.group({
          value: [0, Validators.required],
          unit: ['', Validators.required],
        }),
      }),

      extendCheckBox: this.formBuilder.control<boolean>(false, [
        Validators.required,
      ]),

      extend: this.formBuilder.group({
        balance: this.formBuilder.group({
          value: [0, Validators.required],
          unit: ['', Validators.required],
        }),
      }),

      canBeOveridden: this.formBuilder.control<boolean>(false, [
        Validators.required,
      ]),

      frequency: this.formBuilder.group({
        frequency: this.formBuilder.control<string>('', [Validators.required]),
        start: this.formBuilder.control<Date | null>(null, [
          Validators.required,
        ]),
      }),
    }),

    consumption: this.formBuilder.group({
      consumption: this.formBuilder.control<string>('', [Validators.required]),
      unusedBalance: this.formBuilder.control<string>('', [
        Validators.required,
      ]),
      frequencyNumber: this.formBuilder.control<number>(0, [
        Validators.required,
      ]),
    }),
  });

  switchToMainState() {
    this.ruleForm.get('balance')?.reset();
    this.ruleForm.get('balance')?.disable();

    this.ruleForm.get('consumption')?.reset();
    this.ruleForm.get('consumption')?.disable();
  }

  switchToFirstState() {
    this.ruleForm.get('balance')?.enable();

    this.ruleForm.get('consumption')?.reset();
    this.ruleForm.get('consumption')?.enable();

    this.ruleForm.get('balance.conditional')?.disable();
    this.ruleForm.get('balance.extend')?.disable();
  }

  switchToSecondState() {
    this.ruleForm.get('balance')?.enable();

    this.ruleForm.get('balance.conditionalCheckBox')?.disable();
    this.ruleForm.get('balance.conditional')?.disable();
    this.ruleForm.get('balance.frequency')?.disable();

    this.ruleForm.get('consumption')?.reset();
    this.ruleForm.get('consumption')?.disable();
  }

  onSubmit() {}
}
