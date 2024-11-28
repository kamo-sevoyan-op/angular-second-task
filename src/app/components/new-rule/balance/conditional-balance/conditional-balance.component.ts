import { Component, input, OnInit } from '@angular/core';
import { CoupledInputComponent } from '../../coupled-input/coupled-input.component';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
} from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

export type Option = { name: string; value: string };

@Component({
  selector: 'app-conditional-balance',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInputModule,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    CoupledInputComponent,
  ],
  templateUrl: './conditional-balance.component.html',
  styleUrl: './conditional-balance.component.css',
})
export class ConditionalBalanceComponent implements OnInit {
  formGroupName = input.required<string>();
  form!: FormGroup;

  conditionTypeOptions: Option[];
  balanceUnitOptions: Option[];

  constructor(private rootFormGroup: FormGroupDirective) {
    this.conditionTypeOptions = [
      { name: 'Greather than', value: 'greather-than' },
      { name: 'Lesser than', value: 'lesser-than' },
    ];

    this.balanceUnitOptions = [
      { name: 'Days', value: 'days' },
      { name: 'Years', value: 'years' },
      { name: 'Months', value: 'months' },
    ];
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(
      this.formGroupName()
    ) as FormGroup;
  }
}
