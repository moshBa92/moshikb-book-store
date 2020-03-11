import { ShoppingCartService } from "./../shopping-cart/shopping-cart.service";
import { AuthService } from "./../auth/auth.service";
import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  shoppingCartPrudoct: number;
  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.isAuth = JSON.parse(localStorage.getItem("token"));
    this.shoppingCartPrudoct = JSON.parse(
      localStorage.getItem("shoppingCartList")
    )?
    JSON.parse(
      localStorage.getItem("shoppingCartList")
    ).length:
    0;

  }

  ngOnInit() {
    this.subscription = this.authService.isAuthChanged.subscribe(
      (isAuth: boolean) => {
        this.isAuth = isAuth;
      }
    );
    this.subscription = this.shoppingCartService.shoppingCartListChanged.subscribe(
      (shoppingCart) => {
        this.shoppingCartPrudoct = shoppingCart.length;
      }
    );
  }

  onLogout() {
    this.authService.Logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
