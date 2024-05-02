import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  //{ path: '**', redirectTo: '/login', pathMatch: 'full' },
];