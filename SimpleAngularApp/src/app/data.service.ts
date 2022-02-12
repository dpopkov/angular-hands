import { Injectable } from '@angular/core';
import {Book} from "./model/Book";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  books: Array<Book>

  constructor() {
    this.books = new Array<Book>();
    const book1 = new Book();
    book1.title = 'first book';
    book1.author = 'James';
    book1.price = 2.99;
    this.books.push(book1);

    const book2 = new Book();
    book2.title = 'second book';
    book2.author = 'James';
    book2.price = 3.99;
    this.books.push(book2);

    const book3 = new Book();
    book3.title = 'third book';
    book3.author = 'James';
    book3.price = 4.99;
    this.books.push(book3);
  }
}
