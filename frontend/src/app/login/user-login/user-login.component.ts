import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';
import { TableService } from '../../core/services/tables.service';
import { Router } from '@angular/router';

let initialUsernameValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialUsernameValue = loadedForm.username || '';
}

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  constructor(private router: Router, private tableService: TableService) {}
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    credentialCode: new FormControl(initialUsernameValue, {
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    const savedForm = window.localStorage.getItem('saved-login-form');
    if (savedForm) {
      const loaded = JSON.parse(savedForm);
      this.form.patchValue({ credentialCode: loaded.credentialCode });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const credentialCode = this.form.value.credentialCode!;

    this.tableService.credentialLogin(credentialCode).subscribe({
      next: (res) => {
        console.log('Login Success', res);

        if (res.table && res.table.id) {
          const tableId = res.table.id;
          localStorage.setItem('tableId', tableId.toString()); 
          this.router.navigate(['/home']);
        } else {
          alert('ไม่พบข้อมูลโต๊ะ');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Credential code is invalid or table not found.');
      },
    });
  }
}
