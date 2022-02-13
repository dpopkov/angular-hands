import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import {DataService} from "../data.service";

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component implements OnInit, OnDestroy {

  deleteBookSubscription: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.deleteBookSubscription = this.dataService.bookDeletedEvent.subscribe(
      (book) => {
        alert(`Book written by ${book.author} removed successfully`);
      },
      (error) => {
        alert("Error when removing book: " + error);
      }
    )
  }

  removeLastBook(): void {
    this.dataService.removeLastBook();
  }

  ngOnDestroy(): void {
    this.deleteBookSubscription.unsubscribe();
  }

}
