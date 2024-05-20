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
  makeup: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
   this.makeup = this.router.lastSuccessfulNavigation?.extras.state
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
}