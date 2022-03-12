import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Room} from "../../../model/Room";
import {Router} from "@angular/router";
import {DataService} from "../../../data.service";

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @Input()
  // @ts-ignore
  room: Room;

  @Output()
  dataChangedEvent = new EventEmitter();

  message = '';

  constructor(private router: Router,
              private dataService: DataService) { }

  ngOnInit(): void {
  }

  editRoom() {
    this.router.navigate(["admin", "rooms"], {queryParams: { id: this.room.id, action: 'edit'} })
  }

  deleteRoom() {
    const deleteConfirmed = confirm('Are you sure you wish to delete this room?');
    if (deleteConfirmed) {
      this.message = 'Deleting...';
      this.dataService.deleteRoom(this.room.id).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.router.navigate(["admin", "rooms"]);
        }
      ), error => {
        this.message = 'Sorry - this room cannot be deleted at this time.';
      }
    }
  }
}
