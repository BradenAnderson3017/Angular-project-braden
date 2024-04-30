import { Injectable } from '@angular/core';
import { UserInterface } from './user.interface';

import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesServiceService {

  constructor() { }
  
  // login(email: string, password: string): Observable<void> {
  //   const promise = signInWithEmailAndPassword(
  //     this.auth,
  //     email,
  //     password,
  //   ).then(()=>{});
  //   return from(promise);
  // }

  login(email: string, password: string) {
    return (password)
  }  

  getData() {
    
  }
}
