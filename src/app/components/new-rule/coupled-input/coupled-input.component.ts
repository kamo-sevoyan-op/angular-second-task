import { Component, input, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
export class CoupledInputComponent {
  formGroup = input.required<FormGroup>();
  options = input.required<{ name: string; value: string }[]>();
  label = input<string>();
}
