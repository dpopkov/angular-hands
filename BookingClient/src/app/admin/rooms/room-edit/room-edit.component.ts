import {Component, Input, OnInit} from '@angular/core';
import {Room} from "../../../model/Room";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  @Input()
  // @ts-ignore
  room: Room;

  roomForm = new FormGroup(
    {
      roomName: new FormControl('roomName'),
      roomLocation: new FormControl('roomLocation')
    }
  );

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('this.roomForm', this.roomForm);
  }

}
