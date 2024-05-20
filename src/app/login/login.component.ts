import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import {
  FormGroup,
  FormControl,
  FormControlName,
  ReactiveFormsModule,
  Validators,
  FormsModule,
  FormBuilder,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { merge } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from "@angular/router";


interface Item {
  name: string;
  price: string;
  description: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  errorMessage: string | null = null;

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private firestore: Firestore) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/makeup');
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }

  signInWithGoogle() {
    this.authService.googleSignIn().subscribe({
      next: () => {
        this.router.navigateByUrl('/makeup');
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }
}
