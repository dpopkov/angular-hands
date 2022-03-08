import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Booking} from "../model/Booking";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {User} from "../model/User";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  // @ts-ignore
  bookings: Array<Booking>;
  selectedDate: string;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if (!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyy-MM-dd', 'en');
        }
        this.dataService.getBookings(this.selectedDate).subscribe(
          next =>  this.bookings = next
        )
      }
    )
  }

  editBooking(bookingId: number) {
    this.router.navigate(['bookingEdit'], {queryParams: {id: bookingId}});
  }

  addBooking() {
    this.router.navigate(['bookingAdd']);
  }

  deleteBooking(bookingId: number) {
    this.dataService.deleteBooking(bookingId).subscribe();
  }

  dateChanged() {
    this.router.navigate([''], {queryParams: {date : this.selectedDate}});
  }
}
