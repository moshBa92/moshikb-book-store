import { ShoppingCartService } from "./shopping-cart.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { BookModel } from "../shared/book.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"]
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  shoppingCartList: BookModel[];
  private subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.shoppingCartList = this.shoppingCartService.getShoppingCartList();
    this.subscription = this.shoppingCartService.shoppingCartListChanged.subscribe(
      (shoppingListCart: BookModel[]) => {
        this.shoppingCartList = shoppingListCart;
      }
    );
  }

  getTotalAmount() {
    let totalPrice: number = 0;
    for (let book in this.shoppingCartList) {
      totalPrice += parseFloat(this.shoppingCartList[book].price);
    }
    return totalPrice;
  }
  onDeleteBookFromCart(i: number) {
    this.shoppingCartService.DeleteBookFromCart(i);
  }

  onClearShoppingCart() {
    this.shoppingCartService.clearShoppingCart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
