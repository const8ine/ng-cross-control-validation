import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { crossControlValidator } from '../../projects/ng-cross-control-validation/src';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      subscriptionType: ['', Validators.required],
      discountCode: [
        '',
        [crossControlValidator('subscriptionType', (type: string) => type === 'premium')]
      ]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    } else {
      console.log('Form invalid:', this.form.errors, this.form.value);
    }
  }
}
