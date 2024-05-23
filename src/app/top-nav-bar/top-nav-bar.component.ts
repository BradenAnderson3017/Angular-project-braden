import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "../auth.service";
import { MakeUpService } from "../makeup.service";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { CartService } from "../cart.service";
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: "app-top-nav-bar",
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatBadgeModule, MatButtonModule],
  templateUrl: "./top-nav-bar.component.html",
  styleUrl: "./top-nav-bar.component.css",
})
export class TopNavBarComponent implements OnInit {
  authService = inject(AuthService);
  makeUpService = inject(MakeUpService);

  cartItems$ = this.cartService.cartItems$;
  makeup: any;
  makeupBadge: any[] = [];
  
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.makeup = this.makeUpService.makeupResult;
    this.makeup.subscribe((makeup: any) => {
      this.makeup = makeup;
    });

    if (this.authService.currentUserSig() !== null) {
      this.cartService.cartItems$.subscribe((items: any) => {
        this.makeupBadge = items.map((item: any) => item.quantity);
        if (this.makeupBadge.length > 0) {
          console.log(this.makeupBadge);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }

  findBadgeNumber(): number {
    if (this.makeupBadge.length > 0) {
      return this.makeupBadge.reduce((a: number, b: number) => a + b, 0);
    }
    return 0;
  }
}