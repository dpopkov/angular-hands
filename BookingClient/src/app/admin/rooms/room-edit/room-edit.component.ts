import {Component, Input, OnInit} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "../../../model/Room";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  // @ts-ignore
  roomForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
    this.roomForm = this.formBuilder.group(
        {
          roomName: [this.room.name, Validators.required],
          roomLocation: [this.room.location, [Validators.required, Validators.minLength(2)]]
        }
    )
    for (const layoutKey of this.layoutKeys) {
      // @ts-ignore
      const layoutCapacity = this.room.capacities.find(lc => lc.layout === Layout[layoutKey]);
      const initialCapacity = layoutCapacity == null ? 0 : layoutCapacity.capacity;
      const label = `layout${layoutKey}`;
      this.roomForm.addControl(label, this.formBuilder.control(initialCapacity));
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
    console.log('roomForm:', this.roomForm);
    // todo: call a method in the data service to save the room
  }

}
