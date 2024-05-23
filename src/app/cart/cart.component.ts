import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "../auth.service";
import {
  Firestore,
  doc,
  getDoc,
  updateDoc,
  DocumentData,
  collection,
  collectionData,
} from "@angular/fire/firestore";
import { map } from 'rxjs';
import { CartService } from "../cart.service";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"], // Corrected styleUrl to styleUrls
})
export class CartComponent implements OnInit {
  cartItems$ = this.cartService.cartItems$;
  router = inject(Router);
  authService = inject(AuthService);
  makeup: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
   this.makeup = this.router.lastSuccessfulNavigation?.extras.state
   if (this.authService.currentUserSig()) {
    this.cartService.cartItems$.subscribe((item: any) => {
      console.log(item)
    })
   }
  }

  onAddToCart(item: any) {
    this.cartService.addToCart(item);
  }

  onRemoveFromCart(itemId: string) {
    this.cartService.removeFromCart(itemId);
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }
  quantity(value: any, itemId: any) {
    const cartItem = document.querySelector(`.item${itemId}`);
    console.log(cartItem)

    if (value == 'Add to Quantity') {
      this.cartService.cartItems$.subscribe((items: any) => {
        const item = items.find((obj: any) => obj.id === itemId);
        if (item) {
          console.log(item);
          item.quantity = item.quantity + 1;
        }
      });
    
    } else {
      this.cartService.cartItems$.subscribe((items: any) => {
        const item = items.find((obj: any) => obj.id === itemId);
        if (item) {
          if (item.quantity == 1) {
            console.log(item);
            this.onRemoveFromCart(item.id)
          } else {
            console.log(item);
          item.quantity = item.quantity - 1;
          }
        }
      });
    }
  
  }
}