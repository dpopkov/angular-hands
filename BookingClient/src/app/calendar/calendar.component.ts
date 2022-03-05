import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Booking} from "../model/Booking";
import {Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  // @ts-ignore
  bookings: Array<Booking>;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getBookings().subscribe(
      next =>  this.bookings = next
    )
  }

  editBooking(bookingId: number) {
    this.router.navigate(['bookingEdit'], {queryParams: {id: bookingId}});
  }
}
