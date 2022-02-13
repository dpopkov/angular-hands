import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Book} from "../model/Book";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input()
  lastAccessed = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  addBook() {
    const book = new Book();
    book.title = 'Added on ' + new Date();
    book.author = 'Angular';
    book.price = 123;
    this.dataService.addBook(book);
  }

  addBookByJames() {
    const book = new Book();
    book.title = 'Added on ' + new Date();
    book.author = 'James';
    book.price = 321;
    this.dataService.addBook(book);
  }
}
