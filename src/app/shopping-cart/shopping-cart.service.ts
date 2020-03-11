import { Injectable } from "@angular/core";
import { BookModel } from "../shared/book.model";
import { Subject } from "rxjs/internal/Subject";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  shoppingCartListChanged = new Subject<BookModel[]>();
  private shoppingCartList: BookModel[];

  constructor() {
    let retrievedObject = localStorage.getItem("shoppingCartList");
    if (retrievedObject) {
      this.shoppingCartList = JSON.parse(retrievedObject).slice();
    } else {
      this.shoppingCartList = [];
    }
    this.shoppingCartListChanged.next(this.shoppingCartList.slice());
  }

  addBookToShoppingCart(book: BookModel) {
    let isBookAlredyExist: any;
    for (let index in this.shoppingCartList) {
      if (book.isbn === this.shoppingCartList[index].isbn) {
        isBookAlredyExist = true;
      }
    }
    if (isBookAlredyExist) {
      this.shoppingCartListChanged.next(this.shoppingCartList.slice());
    } else {
      this.shoppingCartList.push(book);
      localStorage.setItem(
        "shoppingCartList",
        JSON.stringify(this.shoppingCartList)
      );
      this.shoppingCartListChanged.next(this.shoppingCartList.slice());
    }
  }

  getShoppingCartList() {
    let retrievedObject = localStorage.getItem("shoppingCartList");
    if (retrievedObject) {
      return (this.shoppingCartList = JSON.parse(retrievedObject).slice());
    } else {
      return (this.shoppingCartList = []);
    }
  }
  DeleteBookFromCart(index: number) {
    this.shoppingCartList.splice(index, 1);
    localStorage.setItem(
      "shoppingCartList",
      JSON.stringify(this.shoppingCartList)
    );
    this.shoppingCartListChanged.next(this.shoppingCartList.slice());
  }
  clearShoppingCart() {
    this.shoppingCartList = [];
    localStorage.setItem("shoppingCartList", JSON.stringify([]));
    this.shoppingCartListChanged.next(this.shoppingCartList.slice());
  }
}
