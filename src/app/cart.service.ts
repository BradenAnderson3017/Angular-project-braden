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
  getDocs,
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

  async addToCart(makeupItem: any, quantity: number = 1) {
    const cartItem = { makeupItem, quantity };
    const itemId = makeupItem.id;
    const itemRef = doc(this.firestore, `users/${this.userId}/cart/${itemId}`);
    const docSnapshot = await getDoc(itemRef);

    if (docSnapshot.exists()) {
      const existingItem = docSnapshot.data() as CartItem;
      await updateDoc(itemRef, { quantity: existingItem.quantity + quantity });
    } else {
      await setDoc(itemRef, cartItem);
    }

    this.fetchCartItems(); // Fetch cart items after adding
  }

  async removeFromCart(itemId: string) {
    const itemRef = doc(this.firestore, `users/${this.userId}/cart/${itemId}`);
    await deleteDoc(itemRef);
    this.fetchCartItems(); // Fetch cart items after removing
  }

  async clearCart() {
    const collectionRef = collection(this.firestore, `users/${this.userId}/cart`);
    const querySnapshot = await getDocs(collectionRef);
  
    const deletePromises: Promise<void>[] = [];
    querySnapshot.forEach((doc: any) => {
      deletePromises.push(deleteDoc(doc.ref));
    });
  
    await Promise.all(deletePromises);
    this.cartItemsSubject.next([]); // Clear the cart items subject
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
