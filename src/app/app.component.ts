import { user } from "@angular/fire/auth";
import { Component, OnInit, inject, EventEmitter, Output } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from "./auth.service";
import { TopNavBarComponent } from "./top-nav-bar/top-nav-bar.component";
import { MakeUpService } from "./makeup.service";
import { Firestore, addDoc, collection, collectionData } from "@angular/fire/firestore";
import { map } from 'rxjs';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, TopNavBarComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  title = "movies-angular-app";
  makeup: any;
  authService = inject(AuthService);
  makeupService = inject(MakeUpService);
  firestore = inject(Firestore);
  userInfo: any;

  ngOnInit(): void {
    this.makeupService.fetchAllMakeup();
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      // console.log(this.authService.currentUserSig());
    });
  }

  
}
