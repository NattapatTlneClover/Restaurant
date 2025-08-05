import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { Router, RouterModule } from '@angular/router';

function usernameIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null);
  }

  return of({ notUnique: true });
}

// function mustContainQuestionMark(control: AbstractControl) {
//   if (control.value.includes('?')) {
//     return null;
//   }
//   return { doseNotContainQuestionMark: true };
// }

let initialUsernameValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialUsernameValue = loadedForm.username || '';
}

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent implements OnInit {
  isLoginFailed = false;
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private authService: AuthService
  ) {}

  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    username: new FormControl(initialUsernameValue, {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      asyncValidators: [usernameIsUnique],
    }),
  });

  get usernameIsInvalid() {
    return (
      this.form.controls.username.touched &&
      this.form.controls.username.dirty &&
      this.form.controls.username.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  ngOnInit() {
    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({ username: value.username })
          );
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const payload = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.authService.login(payload).subscribe({
      next: (data) => {
        console.log('Login Success:', data);
        // เก็บ token ลง localStorage หรือ sessionStorage
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveRefreshToken(data.refreshToken);
        this.tokenStorage.saveUser(data.admin);
        // redirect หน้า dashboard
        this.router.navigateByUrl('/admin/table');
      },
      error: (err) => {
        this.isLoginFailed = true;
        console.error('Login Failed:', err);
        alert('Login failed, please check your username and password.');
      },
    });
    console.log(this.form);
    const enteredUsername = this.form.value.username;
    const enteredPassword = this.form.value.password;
    console.log(enteredUsername, enteredPassword);
  }
}
