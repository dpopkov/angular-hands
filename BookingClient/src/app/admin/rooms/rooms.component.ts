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

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      (next) => {
        this.rooms = next;
        this.loadingData = false;
      },
      (error) => {
        this.message = 'Sorry - something went wrong, please try again. '
          + error.message;  // try to replace this error.message with a more meaningful message to the user
        console.log('ngOnInit: error:', error);
      }
    )
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

  setSelectedRoom(roomId: number): void {
    this.router.navigate(['admin', 'rooms'], {queryParams : { id: roomId, action: 'view'}});
  }

  addRoom(): void {
    this.router.navigate(['admin', 'rooms'], {queryParams : { action: 'add'}});
  }

}
