import { ShoppingCartService } from './../../shopping-cart/shopping-cart.service';
import { BooksListService } from './../books-list.service';
import { Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/shared/book.model';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.component.html',
  styleUrls: ['./books-detail.component.scss']
})
export class BooksDetailComponent implements OnInit {

  book: BookModel;
  isbn: string;
  constructor(private route: ActivatedRoute,
    private bookListService: BooksListService,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.isbn = this.route.snapshot.params['isbn'];
    this.book = this.bookListService.getBookByIsbn(this.isbn);
  }

  onAddBookToShoppingCart(book) {
    this.shoppingCartService.addBookToShoppingCart(book);
  }
}