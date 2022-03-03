import {Component, Input, OnInit} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "../../../model/Room";
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

  layouts = Object.keys(Layout);
  layoutMap: Map<string, string> = new Map<string, string>();
  layoutKeys: Array<string> = [];

  roomForm = new FormGroup(
    {
      roomName: new FormControl('roomName'),
      roomLocation: new FormControl('roomLocation')
    }
  );

  constructor() {
    for(let layout of this.layouts) {
      // @ts-ignore
      let layoutDescription = Layout[layout];
      this.layoutMap.set(layout, layoutDescription);
    }
    for (const key of this.layoutMap.keys()) {
      this.layoutKeys.push(key);
    }
  }

  ngOnInit(): void {
    this.roomForm.patchValue(
      {
        roomName: this.room.name,
        roomLocation: this.room.location
      }
    );
    for (const layoutKey of this.layoutKeys) {
      const label = `layout${layoutKey}`;
      this.roomForm.addControl(label, new FormControl(label));
    }
  }

  onSubmit() {
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.value['roomLocation']; // other way
    this.room.capacities = new Array<LayoutCapacity>();
    for (const layoutKey of this.layoutKeys) {
      const layoutCapacity = new LayoutCapacity();
      // @ts-ignore
      layoutCapacity.layout = Layout[layoutKey];
      const label = `layout${layoutKey}`;
      layoutCapacity.capacity = this.roomForm.controls[label].value;
      this.room.capacities.push(layoutCapacity);
    }
    console.log('updated room:', this.room);
    // todo: call a method in the data service to save the room
  }

}
