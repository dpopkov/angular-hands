import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable, of} from "rxjs";
import {Booking} from "./model/Booking";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms: Array<Room> = new Array<Room>();
  private users: Array<User> = new Array<User>();
  private bookings: Array<Booking> = new Array<Booking>();

  getRooms(): Observable<Array<Room>> {
    return of(this.rooms);
  }

  getUsers(): Observable<Array<User>> {
    return of(this.users);
  }

  getBookings(): Observable<Array<Booking>> {
    return of(this.bookings);
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

    const today: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-UK');
    const booking1 = new Booking(room1, user1, Layout.THEATER, 'Example Booking 1', today,
      '14:00', '15:00', 3, 201);
    const booking2 = new Booking(room2, user2, Layout.USHAPE, 'Example Booking 2', today,
      '15:00', '16:00', 5, 202);
    this.bookings.push(booking1);
    this.bookings.push(booking2);
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

  updateRoom(room: Room): Observable<Room> {
    const originalRoom = this.rooms.find(r => r.id === room.id);
    if (originalRoom) {
      originalRoom.name = room.name;
      originalRoom.location = room.location;
      originalRoom.capacities = room.capacities;
    }
    // @ts-ignore
    return of(originalRoom);
  }

  addRoom(newRoom: Room): Observable<Room> {
    let maxId = 0;
    for (const r of this.rooms) {
      if (r.id > maxId) {
        maxId = r.id;
      }
    }
    newRoom.id = maxId + 1;
    this.rooms.push(newRoom);
    return of(newRoom);
  }

  deleteRoom(id: number): Observable<any> {
    const room = this.rooms.find(r => r.id === id);
    // @ts-ignore
    this.rooms.splice(this.rooms.indexOf(room), 1);
    return of(null);
  }

  deleteUser(id: number): Observable<any> {
    const user = this.users.find(u => u.id === id);
    // @ts-ignore
    this.users.splice(this.users.indexOf(user), 1);
    return of(null);
  }

  resetUserPassword(id: number): Observable<any> {
    // Implement in REST version of data service
    return of(null);
  }
}
