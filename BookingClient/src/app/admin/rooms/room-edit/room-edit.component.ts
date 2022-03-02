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
    this.roomForm.patchValue(
      {
        roomName: this.room.name,
        roomLocation: this.room.location
      }
    );
  }

  onSubmit() {
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.value['roomLocation']; // other way
    console.log('updated room:', this.room);
    // todo: call a method in the data service to save the room
  }

}
