import { Injectable, inject } from "@angular/core";
import { Observable, throwError, catchError, map } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class MakeUpService {
  makeupResult: any;
  router = inject(Router)

  constructor(private http: HttpClient) {}
  //https://makeup-api.herokuapp.com/api/v1/products.json

  makeupUrl = "https://makeup-api.herokuapp.com/api/v1/products.json";

  fetchAllMakeup(): Observable<any> {
    if (!this.makeupResult) {
      this.makeupResult = this.http.get(this.makeupUrl).pipe(
        map(response => response),
        catchError((error) => {
          console.error("Error fetching makeup:", error);
          this.router.navigateByUrl('/error')
          return (error);
        })
      );
    }
    return this.makeupResult
  }
}
