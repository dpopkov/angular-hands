import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable} from "rxjs";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms: Array<Room> = new Array<Room>();
  private users: Array<User> = new Array<User>();

  getRooms(): Observable<Array<Room>> {
    return of(this.rooms);
  }

  getUsers(): Observable<Array<User>> {
    return of(this.users);
  }

  constructor() {
    const capacity1 = new LayoutCapacity(Layout.THEATER, 50);
    const capacity2 = new LayoutCapacity(Layout.USHAPE, 20);
    const capacity3 = new LayoutCapacity(Layout.THEATER, 60);

    const room1 = new Room('First Room', 'First Floor', 1);
    room1.addLayoutCapacity(capacity1);
    room1.addLayoutCapacity(capacity2);

    const room2 = new Room('Second Room', 'Third Floor', 2);
    room2.addLayoutCapacity(capacity3);

    this.rooms.push(room1);
    this.rooms.push(room2);

    const user1 = new User(101, 'James');
    const user2 = new User(102, 'Jane');
    this.users.push(user1);
    this.users.push(user2);
  }

  updateUser(toUpdate: User): Observable<User> {
    const originalUser = this.users.find((user) => user.id === toUpdate.id);
    // @ts-ignore
    originalUser.name = toUpdate.name;
    // @ts-ignore
    return of(originalUser);
  }

  addUser(newUser: User, password: string): Observable<User> {
    let maxId = 0;
    for (const user of this.users) {
      if (user.id > maxId) {
        maxId = user.id;
      }
    }
    newUser.id = maxId + 1;
    this.users.push(newUser);
    return of(newUser);
  }
}
