import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MakeUpComponent } from './makeup/makeup.component';
import { RegisterComponent } from './register/register.component';
import { MakeupDetailsComponent } from './makeup-details/makeup-details.component';
import { CartComponent } from './cart/cart.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
  { path: 'makeup', component: MakeUpComponent, canActivate: [AuthGuard] },
  { path: ':brandName/:productName/:product', component: MakeupDetailsComponent, canActivate: [AuthGuard] },
  { path: ':user/cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];