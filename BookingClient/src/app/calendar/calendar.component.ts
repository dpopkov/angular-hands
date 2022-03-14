import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Booking} from "../model/Booking";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  // @ts-ignore
  bookings: Array<Booking>;
  selectedDate: string;
  dataLoaded = false;
  message = '';

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.message = 'Loading data...';
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if (!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyy-MM-dd', 'en');
        }
        this.dataService.getBookings(this.selectedDate).subscribe(
          next => {
            this.bookings = next;
            this.dataLoaded = true;
            this.message = '';
          },
          error => {
            this.message = 'Sorry - the data could not be loaded.'
          }
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
    const deleteConfirmed = confirm('Are you sure you wish to cancel this booking?');
    if (deleteConfirmed) {
      this.message = 'Deleting, please wait...';
      this.dataService.deleteBooking(bookingId).subscribe(
        next => {
          this.loadData();
        },
        error => {
          this.message = 'Sorry there was a problem deleting the item';
        }
      );
    }
  }

  dateChanged() {
    this.router.navigate([''], {queryParams: {date : this.selectedDate}});
  }
}
