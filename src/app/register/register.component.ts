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
import { Observable, map } from 'rxjs';
import { merge } from 'rxjs';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Item {
  name: string;
  price: string;
  description: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  errorMessage: string | null = null;

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject (MovieService);
  router = inject(Router);

  constructor(
    private firestore: Firestore
    ) {
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
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService.register(rawForm.email, rawForm.username, rawForm.password).subscribe({
      next: () => {
      this.router.navigateByUrl('/movies')
    },
      error: (err) => {
        this.errorMessage = err.code;
      }})
  }

  signUpWithGoogle() {
    this.authService.googleSignIn().subscribe({
      next: () => {
        this.router.navigateByUrl('/movies');
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }
}
