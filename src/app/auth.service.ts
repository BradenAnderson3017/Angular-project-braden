import { Injectable, inject, signal } from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  user,
  signOut,
  GoogleAuthProvider,
} from "@angular/fire/auth";
import { Observable, from, map } from "rxjs";
import { UserInterface } from "./user.interface";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  firebaseAuth = inject(Auth);
  angularFireAuth = inject(AngularFireAuth);
  user$ = user(this.firebaseAuth);
  router = inject(Router);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  isAuthenticated(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(
      map((user) => !!user) // Convert user to boolean
    );
  }

  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((res) => updateProfile(res.user, { displayName: username }));
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    this.router.navigateByUrl("/login");
    return from(promise);
  }

  googleSignIn(): Observable<any> {
    return from(
      this.angularFireAuth
        .signInWithPopup(new GoogleAuthProvider())
        // .then((res) => {
        //   console.log(res.user?.multiFactor)
        // }
        //updateProfile(res.user, { displayName: username })
        )
   // );
  }
}
