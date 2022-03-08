import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";
import {ActivatedRoute, Router} from "@angular/router";
import {FormResetService} from "../../form-reset.service";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  // @ts-ignore
  rooms: Array<Room>;
  // @ts-ignore
  selectedRoom: Room;
  // @ts-ignore
  action: string;
  loadingData = true;
  message = 'Please wait... getting the list of rooms';
  reloadAttempts = 0;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.loadData();
    this.route.queryParams.subscribe(
      (params) => {
        const idAsString = params['id'];
        if (idAsString) {
          const idAsNumber = +idAsString;
          // @ts-ignore
          this.selectedRoom = this.rooms.find(room => room.id === idAsNumber);
        }
        this.action = params['action'];
        if (this.action === 'add') {
          this.selectedRoom = new Room();
          this.action = 'edit';
          this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
        }
      }
    )
  }

  loadData(): void {
    this.dataService.getRooms().subscribe(
      (next) => {
        this.rooms = next;
        this.loadingData = false;
      },
      (error) => {
        if (error.status === 402) {
          this.message = 'Sorry - you need to pay to use this application';
        } else {
          this.reloadAttempts++;
          if (this.reloadAttempts < 10) {
            this.message = 'Sorry - something went wrong, please trying again.... please wait';
            this.loadData();
          } else {
            this.message = 'Sorry - something went wrong, please contact support';
          }
        }
      }
    )
  }

  setSelectedRoom(roomId: number): void {
    this.router.navigate(['admin', 'rooms'], {queryParams : { id: roomId, action: 'view'}});
  }

  addRoom(): void {
    this.router.navigate(['admin', 'rooms'], {queryParams : { action: 'add'}});
  }

}
