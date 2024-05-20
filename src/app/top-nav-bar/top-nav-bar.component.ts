import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "../auth.service";
import { MakeUpService } from "../makeup.service";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";


@Component({
  selector: "app-top-nav-bar",
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: "./top-nav-bar.component.html",
  styleUrl: "./top-nav-bar.component.css",
})
export class TopNavBarComponent implements OnInit {
  authService = inject(AuthService);
  makeUpService = inject(MakeUpService);
  makeup: any;
  constructor()
  {}

  async ngOnInit() {
    this.makeup = this.makeUpService.makeupResult;
    this.makeup.subscribe((makeup: any) => { 
      this.makeup = makeup
    });
  }
  logout(): void {
    this.authService.logout();
  }
}
