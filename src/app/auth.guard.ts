import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check if user is authenticated
    return this.authService.isAuthenticated().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true; // Allow navigation
        } else {
          // Redirect to login page and save the original URL for redirection after login
          return this.router.createUrlTree(["/login"], {
            queryParams: { returnUrl: state.url },
          });
        }
      })
    );
  }
}
