import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      (next) => {
        this.rooms = next;
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
