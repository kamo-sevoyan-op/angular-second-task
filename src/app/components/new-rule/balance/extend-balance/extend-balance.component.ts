import { Component, input, OnInit } from '@angular/core';
import { CoupledInputComponent } from '../../coupled-input/coupled-input.component';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

export type Option = { name: string; value: string };

@Component({
  selector: 'app-extend-balance',
  standalone: true,
  imports: [CoupledInputComponent, ReactiveFormsModule],
  templateUrl: './extend-balance.component.html',
  styleUrl: './extend-balance.component.css',
})
export class ExtendBalanceComponent implements OnInit {
  formGroupName = input.required<string>();
  form!: FormGroup;

  balanceUnitOptions: Option[];

  constructor(private rootFormGroup: FormGroupDirective) {
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
