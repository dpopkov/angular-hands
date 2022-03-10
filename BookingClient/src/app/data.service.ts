import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable, of} from "rxjs";
import {Booking} from "./model/Booking";
import {formatDate} from "@angular/common";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getRooms(): Observable<Array<Room>> {
    return this.http.get<Array<Room>>(environment.restUrl + '/api/rooms')
      .pipe(
        map(data => {
          const rooms = new Array<Room>();
          for (const roomData of data) {
            rooms.push(Room.fromHttp(roomData));
          }
          return rooms;
        })
      );
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/api/users')
      .pipe(
        map(data => {
          const users = new Array<User>();
          for (const userData of data) {
            users.push(User.fromHttp(userData));
          }
          return users;
        })
      );
  }

  getBookings(date: string): Observable<Array<Booking>> {
    return of(null);
  }

  getBookingById(id: number): Observable<Booking> {
    return of(null);
  }

  constructor(private http: HttpClient) {
    console.log('data.service.ts: environment.restUrl=', environment.restUrl);
  }

  updateUser(toUpdate: User): Observable<User> {
    return this.http.put<User>(environment.restUrl + '/api/users', toUpdate)
      .pipe(map(data =>  User.fromHttp(data)));
  }

  addUser(newUser: User, userPassword: string): Observable<User> {
    const fullUser = {
      id: newUser.id,
      name: newUser.name,
      password: userPassword
    };
    return this.http.post<User>(environment.restUrl + '/api/users', fullUser)
      .pipe(map(data => User.fromHttp(data)));
  }

  updateRoom(room: Room): Observable<Room> {
    const correctedRoom = {
      id: room.id,
      name: room.name,
      location: room.location,
      capacities: []
    }
    for (const lc of room.capacities) {
      let correctLayout;
      for (let member in Layout) {
        if (Layout[member] === lc.layout) {
          correctLayout = member;
        }
      }
      const correctedLayout = {
        layout: correctLayout,
        capacity: lc.capacity
      }
      correctedRoom.capacities.push(correctedLayout);
    }
    return this.http.put<Room>(environment.restUrl + '/api/rooms', correctedRoom)
      .pipe(map(data => Room.fromHttp(data)));
  }

  addRoom(newRoom: Room): Observable<Room> {
    return of(null);
  }

  deleteRoom(id: number): Observable<any> {
    return of(null);
  }

  deleteUser(id: number): Observable<any> {
    return of(null);
  }

  resetUserPassword(id: number): Observable<any> {
    return of(null);
  }

  getLayoutMap(): Map<string, string> {
    const layoutKeys = Object.keys(Layout);
    const layoutMap: Map<string, string> = new Map<string, string>();
    for (let layout of layoutKeys) {
      // @ts-ignore
      layoutMap.set(layout, Layout[layout]);
    }
    return layoutMap;
  }

  saveBooking(booking: Booking): Observable<Booking> {
    return of(null);
  }

  addBooking(newBooking: Booking): Observable<Booking> {
    return of(null);
  }

  deleteBooking(bookingId: number): Observable<any> {
    return of(null);
  }
}
