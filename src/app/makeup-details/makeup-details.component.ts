import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MakeUpService } from "../makeup.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { SpinnerComponent } from "../spinner/spinner.component";
import { Router } from "@angular/router";
import { state } from "@angular/animations";
import { CartService } from "../cart.service";

@Component({
  selector: "app-makeup-details",
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: "./makeup-details.component.html",
  styleUrl: "./makeup-details.component.css",
})
export class MakeupDetailsComponent {
  makeupService = inject(MakeUpService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  location = inject(Location);
  cartService = inject(CartService);
  isLoading: boolean = true;
  makeup: any;
  makeupStorage: any;
  brandName: any;

  constructor() {}

  ngOnInit() {
    if (!this.makeup) {
      const navigation = this.router.lastSuccessfulNavigation?.extras.state;
      if (navigation && typeof navigation !== "object") {
        this.makeupStorage = navigation;
        this.route.params.subscribe((params) => {
          const productId = params["product"].split(":")[1];
          this.makeup = this.makeupStorage.filter(
            (product: any) => product.id == productId
          );
          this.brandName = this.makeup[0].brand;
          this.isLoading = false;
        });
      } else if (navigation) {
        this.makeupStorage = Object.entries(navigation).map(
          ([key, value]) => value
        );
        this.route.params.subscribe((params) => {
          const productId = params["product"].split(":")[1];
          this.makeup = this.makeupStorage.filter(
            (product: any) => product.id == productId
          );
          this.brandName = this.makeup[0].brand;
          this.isLoading = false;
        });
      } else {
        this.makeupService.fetchAllMakeup().subscribe((response: any) => {
          this.route.params.subscribe((params) => {
            const productId = params["product"].split(":")[1];
            this.makeupStorage = response;
            this.makeup = this.makeupStorage.filter(
              (product: any) => product.id == productId
            );
            this.brandName = this.makeup[0].brand;
            this.isLoading = false;
          });
        });
      }
    }
  }

  addToCart(makeup: any) {
    this.cartService.addToCart(makeup)
  }

  goBack() {
    this.router.navigate(["/makeup"], { state: this.makeupStorage });
  }
}
