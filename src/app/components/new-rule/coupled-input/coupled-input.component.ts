import { Component, input, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-coupled-input',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInputModule,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
  ],
  templateUrl: './coupled-input.component.html',
  styleUrl: './coupled-input.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CoupledInputComponent implements OnInit {
  formGroupName = input.required<string>();
  form!: FormGroup;

  options = input.required<{ name: string; value: string }[]>();
  label = input<string>();

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    console.log(this.rootFormGroup);

    this.form = this.rootFormGroup.control.get(
      this.formGroupName()
    ) as FormGroup;
  }
}
