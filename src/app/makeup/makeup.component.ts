import { Component, ElementRef, inject, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MakeUpService } from "../makeup.service";

import { MatFormField } from "@angular/material/form-field";
import { MatLabel } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { SpinnerComponent } from "../spinner/spinner.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-makeup",
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatLabel,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SpinnerComponent,
  ],
  templateUrl: "./makeup.component.html",
  styleUrl: "./makeup.component.css",
})
export class MakeUpComponent {
  makeupBrands: string[] = [
    "Show All Brands",
    "almay",
    "alva",
    "anna sui",
    "annabelle",
    "benefit",
    "boosh",
    "burt's bees",
    "butter london",
    "c'est moi",
    "cargo cosmetics",
    "china glaze",
    "clinique",
    "coastal classic creation",
    "colourpop",
    "covergirl",
    "dalish",
    "deciem",
    "dior",
    "dr. hauschka",
    "e.l.f.",
    "essie",
    "fenty",
    "glossier",
    "green people",
    "iman",
    "l'oreal",
    "lotus cosmetics usa",
    "maia's mineral galaxy",
    "marcelle",
    "marienatie",
    "maybelline",
    "milani",
    "mineral fusion",
    "misa",
    "mistura",
    "moov",
    "nudus",
    "nyx",
    "orly",
    "pacifica",
    "penny lane organics",
    "physicians formula",
    "piggy paint",
    "pure anada",
    "rejuva minerals",
    "revlon",
    "sally b's skin yummies",
    "salon perfect",
    "sante",
    "sinful colours",
    "smashbox",
    "stila",
    "suncoat",
    "w3llpeople",
    "wet n wild",
    "zorah",
    "zorah biocosmetiques",
  ];

  makeupService = inject(MakeUpService);
  spinner = inject(SpinnerComponent);
  router = inject(Router);
  makeup: any;
  makeupStorage: any;
  isLoading: boolean = true;
  activeFilter: string = "Show All Brands";

  constructor() {}

  ngOnInit() {
    const navigation = this.router.lastSuccessfulNavigation?.extras.state;
    console.log(navigation);
    if (!this.makeup) {
      if ( navigation && typeof navigation !== 'object') {
        this.makeup = navigation
        this.isLoading = false;
      } else if (navigation) {
        this.makeup = Object.entries(navigation).map(([key, value]) => value);
        this.isLoading = false;
      } else {
        this.makeupService.fetchAllMakeup().subscribe((response: any) => {
          this.isLoading = false;
          this.makeup = response;
        });
      }
    }
  }

  filterBrands(makeupName: any, makeupButton: any) {
    this.activeFilter = makeupButton.innerText;
    if (!this.makeupStorage) {
      this.isLoading = true;
      this.makeupStorage = this.makeup;
      if (makeupName !== "Show All Brands") {
        this.makeup = this.makeup.filter(
          (product: any) => product.brand === makeupName
        );
      } else {
        this.makeup = this.makeup;
      }
      this.isLoading = false;
    } else {
      this.isLoading = true;
      this.makeup = this.makeupStorage;
      if (makeupName !== "Show All Brands") {
        this.makeup = this.makeup.filter(
          (product: any) => product.brand === makeupName
        );
      } else {
        this.makeup = this.makeup;
      }
      this.isLoading = false;
    }
  }

  findProductColors(colorsArray: any) {
    if (colorsArray) {
      return colorsArray;
    }
  }
}
