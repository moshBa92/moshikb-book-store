import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { BookModel } from './../shared/book.model';
import { BooksListService } from './books-list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {

  text: string;
  booksList: BookModel[];
  subscription: Subscription;

  constructor(private bookListService: BooksListService,
    private sohppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.booksList = this.bookListService.booklist;
    this.subscription = this.bookListService.bookListChanged
      .subscribe(
        (bookList: BookModel[]) => {
          console.log(bookList);
          this.booksList = bookList;
        }
      );
  }

  onBookDetailPageLoad(isbn: string) {
    this.bookListService.bookDetailPageLoad(isbn);
  }

  onAddBookToShoppingCart(book: BookModel) {
    this.sohppingCartService.addBookToShoppingCart(book);
  }

  onfilterBooks(text: string) {
    this.booksList = this.bookListService.filterBooks(text);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
