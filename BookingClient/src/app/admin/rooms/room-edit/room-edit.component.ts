import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "../../../model/Room";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {FormResetService} from "../../../form-reset.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../auth.service";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit, OnDestroy {

  @Input()
  // @ts-ignore
  room: Room;
  @Output()
  dataChangedEvent = new EventEmitter();
  message = '';
  layouts = Object.keys(Layout);
  layoutMap: Map<string, string> = new Map<string, string>();
  layoutKeys: Array<string> = [];

  // @ts-ignore
  roomForm: FormGroup;

  // @ts-ignore
  resetEventSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService,
              private authService: AuthService) {
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
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetRoomFormEvent.subscribe(
      room => {
        this.room = room;
        this.initializeForm();
      }
    )
  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }

  private initializeForm() {
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
    this.message = 'Saving...';
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
    if (this.room.isNew()) {
      this.dataService.addRoom(this.room).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.navigateToView(next);
        },
        error => this.message = 'Something went wrong, you may wish to try again.'
      );
    } else {
      this.dataService.updateRoom(this.room, this.authService.jwtToken).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.navigateToView(next);
        },
        error => this.message = 'Something went wrong, you may wish to try again. Error status ' + error.status
      );
    }
  }

  private navigateToView(next: Room) {
    this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'view', id: next.id}});
  }
}
