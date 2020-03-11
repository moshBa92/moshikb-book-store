import { Subscription } from "rxjs";
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { BooksListService } from "../books-list/books-list.service";
import { BookModel } from "../shared/book.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-book",
  templateUrl: "./edit-book.component.html",
  styleUrls: ["./edit-book.component.scss"]
})
export class EditBookComponent implements OnInit, OnDestroy {
  @ViewChild("closeButton", { static: false }) private closeButton: ElementRef;
  booksList: BookModel[];
  bookDetailForm: FormGroup;
  isExistBook: boolean;
  indexOfExistBookEdit: number;
  subscription: Subscription;

  constructor(private bookListService: BooksListService) {}
  ngOnInit() {
    this.booksList = this.bookListService.booklist;
    this.subscription = this.bookListService.bookListChanged.subscribe(
      (bookList: BookModel[]) => {
        this.booksList = bookList;
      }
    );

    this.bookDetailForm = new FormGroup({
      bookData: new FormGroup({
        name: new FormControl("", Validators.required),
        author: new FormControl("", Validators.required),
        year: new FormControl("", Validators.required),
        price: new FormControl("", Validators.required),
        imagePath: new FormControl("", Validators.required),
        isbn: new FormControl("", Validators.required)
      })
    });
  }

  onOpenNewBookForm() {
    this.isExistBook = false;
    this.bookDetailForm.setValue({
      bookData: {
        name: "",
        author: "",
        year: "",
        price: "",
        imagePath: "",
        isbn: "" ///check this
      }
    });
  }

  onOpenExistingBookForm(book: BookModel, index: number) {
    this.isExistBook = true;
    this.indexOfExistBookEdit = index;
    this.bookDetailForm.patchValue({
      bookData: {
        name: book.name,
        author: book.author,
        year: book.YearOfPublication,
        price: book.price,
        imagePath: book.imagePath,
        isbn: book.isbn
      }
    });
  }

  onSubmit() {
    const name: string = this.bookDetailForm.value.bookData.name;
    const author: string = this.bookDetailForm.value.bookData.author;
    const year: string = this.bookDetailForm.value.bookData.year;
    const price: string = this.bookDetailForm.value.bookData.price;
    const imagePath: string = this.bookDetailForm.value.bookData.imagePath;
    const isbn: string = this.bookDetailForm.value.bookData.isbn;

    if (this.isExistBook) {
      this.bookListService.editExistBook(
        name,
        author,
        year,
        price,
        imagePath,
        isbn,
        this.indexOfExistBookEdit
      );
    } else {
      this.bookListService.creatNewBook(
        name,
        author,
        year,
        price,
        imagePath,
        isbn
      );
    }
    this.closeButton.nativeElement.click();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
