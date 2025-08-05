import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get('controlName1')?.value;
    const val2 = control.get('controlName2')?.value;

    if (val1 === val2) {
      return null;
    }

    return { valuesNotEqual: true };
  };
}

@Component({
  selector: 'app-admin-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-signup.component.html',
  styleUrl: './admin-signup.component.css',
})
export class AdminSignupComponent {
  constructor(private authservice: AuthService) {}

  form = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),

        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    role: new FormControl<'admin' | 'other'>('admin', {
      validators: [Validators.required],
    }),
    agree: new FormControl(false, { validators: [Validators.required] }),
  });

  onSubmit() {
   if (this.form.invalid) {
    console.log('INVALID FORM');
    return;
  }

  const fullName = this.form.value.firstName + ' ' + this.form.value.lastName;

  const payload = {
    username: this.form.value.username,
    password: this.form.value.passwords?.password,  
    full_name: fullName.trim(),
    role: this.form.value.role,
  };

  this.authservice.register(payload).subscribe({
    next: (res) => {
      console.log('Register success', res);
    },
    error: (err) => {
      console.log(payload)
      console.error('Register failed', err);
    },
  });
  }

  onReset() {
    this.form.reset();
  }
}
