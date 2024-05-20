import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "@angular/fire/firestore";
import { AuthService } from "./auth.service";

interface CartItem {
  id: string;
  makeupItem: any;
  quantity: number;
}

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private userCartCollection: any;
  userId: any;

  constructor(private firestore: Firestore, private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.userCartCollection = collection(
          this.firestore,
          `users/${user.uid}/cart`
        );
        this.fetchCartItems();
      }
    });
  }

  private fetchCartItems() {
    collectionData(this.userCartCollection, { idField: "id" })
      .pipe(
        map((actions) => {
          return actions.map((a: any) => {
            const data = a as CartItem;
            return { ...data }; // Spread data object
          });
        })
      )
      .subscribe((items) => {
        this.cartItemsSubject.next(items);
      });
  }

  addToCart(makeupItem: any, quantity: number = 1) {
    const cartItem = { makeupItem, quantity };
    const itemId = makeupItem.id;
    const itemRef = doc(this.firestore, `users/${this.userId}/cart/${itemId}`);
    getDoc(itemRef).then((docSnapshot: any) => {
      if (docSnapshot.exists()) {
        const existingItem = docSnapshot.data() as CartItem;
        updateDoc(itemRef, { quantity: existingItem.quantity + quantity });
      } else {
        setDoc(itemRef, cartItem);
      }
    });
  }

  removeFromCart(itemId: string) {
    const itemRef = doc(this.firestore, `users/${this.userId}/cart/${itemId}`);
    deleteDoc(itemRef);
  }

  clearCart() {
    const collectionRef = collection(this.firestore, `users/${this.userId}/cart/`);
    collectionData(collectionRef) 
    .subscribe((documents) => {
      documents.forEach((document: any) => {
        const itemRef = doc(this.firestore, `users/${this.userId}/cart/${document.makeupItem.id}`)
        deleteDoc(itemRef);
      })
    })
  }

  getCartItems() {
    return this.cartItemsSubject.value;
  }

  getTotalPrice() {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.makeupItem.price * item.quantity,
      0
    );
  }
}
