import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesServiceService } from '../movies-service.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NgxAuthFirebaseUIModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: MoviesServiceService,
    private router: Router
  ) {}

  onSubmit(email: string, password: string): void {
    this.authService.login(email, password);
    // .subscribe({
    //   next: () => {
    //     this.router.navigate(['/movies']);
    //   },
    //   error: (error: any) => {
    //     console.error('Login error:', error);
    //     // Handle login error (e.g., display error message to user)
    //   },
    // });
  }

  printUser(event: any) {
    console.log(event);
  }

  printError(event: any) {
    console.error(event);
  }
}
