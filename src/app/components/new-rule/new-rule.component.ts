import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { BalanceInputComponent } from './balance/balance.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { MatIcon } from '@angular/material/icon';

export type Option = { name: string; value: string };

@Component({
  selector: 'app-new-rule',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    BasicInfoComponent,
    BalanceInputComponent,
    ConsumptionComponent,
    MatIcon
  ],
  templateUrl: './new-rule.component.html',
  styleUrl: './new-rule.component.css',
})

export class NewRuleComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  formState = signal<string | null>(null);

  ruleForm = this.formBuilder.group({
    name: this.formBuilder.control<string | null>(null, [Validators.required]),

    basicInfo: this.formBuilder.group({
      type: this.formBuilder.control<string | null>(null, [
        Validators.required,
      ]),
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
        value: this.formBuilder.control<number>(0, [Validators.required]),
        unit: this.formBuilder.control<string>('', [Validators.required]),
      }),

      conditionalCheckBox: this.formBuilder.control<boolean>(false, [
        Validators.required,
      ]),

      conditional: this.formBuilder.group({
        conditionType: this.formBuilder.control<string>('', [
          Validators.required,
        ]),
        conditionalBalance: this.formBuilder.group({
          value: this.formBuilder.control<number>(0, [Validators.required]),
          unit: this.formBuilder.control<string>('', [Validators.required]),
        }),

        balance: this.formBuilder.group({
          value: this.formBuilder.control<number>(0, [Validators.required]),
          unit: this.formBuilder.control<string>('', [Validators.required]),
        }),
      }),

      extendCheckBox: this.formBuilder.control<boolean>(false),

      extend: this.formBuilder.group({
        balance: this.formBuilder.group({
          value: this.formBuilder.control<number>(0, [Validators.required]),
          unit: this.formBuilder.control<string>('', [Validators.required]),
        }),
      }),

      canBeOveridden: this.formBuilder.control<boolean>(false),

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

  constructor() {
    effect(() => {
      switch (this.formState()) {
        case 'through-balance':
          this.switchToFirstState();
          break;
        case 'event-based':
          this.switchToSecondState();
          break;
        default:
          this.switchToMainState();
      }
    });
  }

  switchToMainState() {
    const balance = this.ruleForm.get('balance');
    balance?.disable();
    balance?.reset();
    const consumption = this.ruleForm.get('consumption');
    consumption?.disable();
    consumption?.reset();
  }

  switchToFirstState() {
    this.ruleForm.get('balance')?.enable();

    this.ruleForm.get('consumption')?.reset();
    this.ruleForm.get('consumption')?.enable();

    this.ruleForm.get('balance.conditional')?.disable();
    this.ruleForm.get('balance.extend')?.disable();
  }

  switchToSecondState() {
    const balance = this.ruleForm.get('balance');
    const consumption = this.ruleForm.get('consumption');

    balance?.enable();

    this.ruleForm.get('balance.conditionalCheckBox')?.disable();
    this.ruleForm.get('balance.conditional')?.disable();
    this.ruleForm.get('balance.extend')?.disable();
    this.ruleForm.get('balance.frequency')?.disable();

    consumption?.reset();
    consumption?.disable();
  }

  onSubmit() {
  }

  ngOnInit(): void {
    this.switchToMainState();
  }
}
