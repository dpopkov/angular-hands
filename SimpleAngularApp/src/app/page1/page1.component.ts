import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import {DataService} from "../data.service";
import {Book} from "../model/Book";

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit, OnDestroy {

  pageName = 'Page 1';
  books: Array<Book>;
  numberOfBooksWrittenByJames: number;

  subscription: Subscription;
  deleteBookSubscription: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // This callback proves that template expressions are dynamic
    setTimeout(() => { this.pageName = 'First page' }, 5000);
    this.books = this.dataService.books;
    // This variable is not recalculated every time when the actual number of books is changed
    this.numberOfBooksWrittenByJames = this.books.filter(it => it.author === 'James').length;
    this.subscription = this.dataService.bookAddedEvent.subscribe(
      (newBook) => {
        if (newBook.author === 'James') {
          this.numberOfBooksWrittenByJames++;
        }
      },
      (error) => {
        console.error("Error when adding book:", error);
      },
      () => {
        console.log("Complete")
      }
    );
    this.deleteBookSubscription = this.dataService.bookDeletedEvent.subscribe(
      (book) => {
        if (book.author === 'James') {
          this.numberOfBooksWrittenByJames--;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.deleteBookSubscription.unsubscribe();
  }

  onButtonClick(): void {
    alert('Hello - the date today is ' + new Date());
  }
}
