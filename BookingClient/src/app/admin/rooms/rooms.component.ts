import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";

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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.rooms = this.dataService.rooms;
  }

  setSelectedRoom(id: number): void {
    // @ts-ignore
    this.selectedRoom = this.rooms.find(room => room.id === id);
  }

}
