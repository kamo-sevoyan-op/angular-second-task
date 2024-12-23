import { Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormField, MatLabel, MatSelect } from '@angular/material/select';

export type Option = { name: string; value: string };

@Component({
  selector: 'app-consumption',
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
  templateUrl: './consumption.component.html',
  styleUrl: './consumption.component.css',
})
export class ConsumptionComponent implements OnInit{
  frequencyNumberOptions: Option[];
  consumptionOptions: Option[];

  formGroupName = input.required<string>();
  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {
    this.frequencyNumberOptions = [
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
    ];

    this.consumptionOptions = this.consumptionOptions = [
      { name: 'Accural', value: 'accural' },
      { name: 'Accumulative', value: 'accumulative' },
    ];
  }

  ngOnInit() {
    this.form = this.rootFormGroup.control.get(this.formGroupName()) as FormGroup;
  }
}
