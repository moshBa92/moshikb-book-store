export class BookModel {
  public name: string;
  public author: string;
  public price: string;
  public YearOfPublication: string;
  public imagePath: string;
  public isbn: string;

  constructor(
    name: string,
    author: string,
    price: string,
    YearOfPublication: string,
    imagePath: string,
    isbn: string
  ) {
    this.name = name;
    this.author = author;
    this.price = price;
    this.YearOfPublication = YearOfPublication;
    this.imagePath = imagePath;
    this.isbn = isbn;
  }
}