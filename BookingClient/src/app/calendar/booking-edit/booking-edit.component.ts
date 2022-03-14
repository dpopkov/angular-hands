import { Component, OnInit } from '@angular/core';
import {Booking} from "../../model/Booking";
import {Layout, Room} from "../../model/Room";
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.css']
})
export class BookingEditComponent implements OnInit {

  booking: Booking;
  rooms: Array<Room>;
  layouts = Object.keys(Layout);
  layoutMap: Map<string, string>;
  users: Array<User>;
  dataLoaded = false;
  message = 'Please wait...';

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
    this.layoutMap = this.dataService.getLayoutMap();
  }

  ngOnInit(): void {
    this.rooms = this.route.snapshot.data['rooms'];
    this.users = this.route.snapshot.data['users'];

    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      const idNumber = +id;
      this.dataService.getBookingById(idNumber)
        .pipe(map(
          booking => {
            booking.room = this.rooms.find(room => room.id === booking.room.id);
            booking.user = this.users.find(user => user.id === booking.user.id);
            return booking;
          }
        ))
        .subscribe(next => {
          this.booking = next;
          this.dataLoaded = true;
          this.message = '';
        });
    } else {
      this.booking = new Booking();
      this.dataLoaded = true;
      this.message = '';
    }
  }

  onSubmit(): void {
    if (this.booking.isNew()) {
      this.dataService.addBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      )
    } else {
      this.dataService.saveBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );
    }
  }
}
