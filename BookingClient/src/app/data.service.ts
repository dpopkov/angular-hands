import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  rooms: Array<Room> = new Array<Room>();

  constructor() {
    const capacity1 = new LayoutCapacity(Layout.THEATER, 50);
    const capacity2 = new LayoutCapacity(Layout.USHAPE, 20);
    const capacity3 = new LayoutCapacity(Layout.THEATER, 60);

    const room1 = new Room(1, 'First Room', 'First Floor');
    room1.addLayoutCapacity(capacity1);
    room1.addLayoutCapacity(capacity2);

    const room2 = new Room(2, 'Second Room', 'Third Floor');
    room2.addLayoutCapacity(capacity3);

    this.rooms.push(room1);
    this.rooms.push(room2);
  }
}
