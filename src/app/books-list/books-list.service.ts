import { BookModel } from './../shared/book.model';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksListService {


  bookListChanged = new Subject<BookModel[]>();
  private bookList: BookModel[] = [
    new BookModel
      ('Steve Jobs',
        'Walter Isaacson',
        '16.99',
        '2011',
        'https://images-na.ssl-images-amazon.com/images/I/418oH6YjpFL.jpg',
        '1451648537'),
    new BookModel
      ('Shoe Dog: A Memoir by the Creator of Nike',
        'Phil Knight',
        '20.89',
        '2018',
        'https://images-na.ssl-images-amazon.com/images/I/51EioQX14%2BL._SX331_BO1,204,203,200_.jpg',
        '1501135929'),
    new BookModel
      ('Einstein: His Life and Universe ',
        'Walter Isaacson',
        '100',
        '2008',
        'https://images-na.ssl-images-amazon.com/images/I/51M5QdLf%2B9L._SX330_BO1,204,203,200_.jpg',
        '0743264746'),
    new BookModel
      ('Fear and Loathing in Las Vegas',
        'Hunter S. Thompson',
        '8.29',
        '1998',
        'https://images-na.ssl-images-amazon.com/images/I/516ewsQg54L._SX319_BO1,204,203,200_.jpg',
        '9780679785'),
    new BookModel
      ('The Glass Castle: A Memoir ',
        'Jeannette Walls ',
        '7.79',
        '2006',
        'https://images-na.ssl-images-amazon.com/images/I/41qFdmnyvxL._SX314_BO1,204,203,200_.jpg',
        '9780743247')
  ];


  constructor(private router: Router, private route: ActivatedRoute) {
    let retrievedObject = localStorage.getItem('bookList');
    if (retrievedObject) {
      this.bookList = JSON.parse(retrievedObject).slice();
    }
  }


  get booklist() {
    return this.bookList;
  }

  bookDetailPageLoad(isbn: string) {
    this.router.navigate(['/books-list', isbn]);
  }


  getBookByIsbn(isbn: string) {
    {
      let book: any;
      book = this.booklist.find(x => x.isbn === isbn);
      return book;
    }
  }

  editExistBook(name, author, year, price, imagePath, isbn, bookIndexInTheList) {
    console.log(bookIndexInTheList);
    console.log(this.bookList);
    this.bookList[bookIndexInTheList] = new BookModel(name, author, price, year, imagePath, isbn);
    localStorage.setItem('bookList', JSON.stringify(this.bookList));
    this.bookListChanged.next(this.bookList.slice());
  }

  creatNewBook(name, author, year, price, imagePath, isbn) {
    this.bookList.push(new BookModel(name, author, price, year, imagePath, isbn));
    localStorage.setItem('bookList', JSON.stringify(this.bookList));
    this.bookListChanged.next(this.bookList.slice());
  }

  filterBooks(text: string) {
    const textToCheck = text.toLowerCase();
    const filterdArray = this.bookList.filter((book) => {
      const bookName = book.name.toLowerCase();
      return bookName.includes(textToCheck);
    })
    if (!filterdArray) {
      return this.bookList;
    }
    else {
      return filterdArray;
    }
  }
}
