import { Component, OnInit } from '@angular/core';
import {EditBookingDataService} from "../../edit-booking-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-booking-edit-load',
  templateUrl: './booking-edit-load.component.html',
  styleUrls: ['./booking-edit-load.component.css']
})
export class BookingEditLoadComponent implements OnInit {

  constructor(private bookingEditDataService : EditBookingDataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    setTimeout(() => this.navigateWhenReady(), 1000);
  }

  navigateWhenReady(): void {
    // check to see if the service data is loaded
    if (this.bookingEditDataService.bookingDataIsLoaded()) {
      // if yes - we'll navigate to the edit component
      const bookingId = this.route.snapshot.queryParams['id'];
      if (bookingId) {
        this.router.navigate(['bookingEdit'], {queryParams: {id: bookingId}});
      } else {
        this.router.navigate(['bookingAdd']);
      }
    } else {
      // if not - wait 500ms then try again
      setTimeout(() => this.navigateWhenReady(), 500);
    }
  }
}
