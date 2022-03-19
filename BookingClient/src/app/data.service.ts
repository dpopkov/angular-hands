import {Injectable} from '@angular/core';
import {Layout, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable, of} from "rxjs";
import {Booking} from "./model/Booking";
import {environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getRooms(): Observable<Array<Room>> {
    return this.http.get<Array<Room>>(environment.restUrl + '/api/rooms', {withCredentials: true})
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
    return this.http.get<Array<User>>(environment.restUrl + '/api/users', {withCredentials: true})
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
    return this.http.get<Array<Booking>>(environment.restUrl + '/api/bookings/' + date, {withCredentials: true})
      .pipe(map(data => {
        const bookings = new Array<Booking>();
        for (const bookingData of data) {
          bookings.push(Booking.fromHttp(bookingData));
        }
        return bookings;
      }));
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(environment.restUrl + '/api/bookings?id=' + id, {withCredentials: true})
      .pipe(map(data => Booking.fromHttp(data)));
  }

  constructor(private http: HttpClient) {
    console.log('data.service.ts: environment.restUrl=', environment.restUrl);
  }

  updateUser(toUpdate: User): Observable<User> {
    return this.http.put<User>(environment.restUrl + '/api/users', toUpdate, {withCredentials: true})
      .pipe(map(data =>  User.fromHttp(data)));
  }

  addUser(newUser: User, userPassword: string): Observable<User> {
    const fullUser = {
      id: newUser.id,
      name: newUser.name,
      password: userPassword
    };
    return this.http.post<User>(environment.restUrl + '/api/users', fullUser, {withCredentials: true})
      .pipe(map(data => User.fromHttp(data)));
  }

  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(environment.restUrl + '/api/rooms', this.getCorrectedRoom(room),
                        {withCredentials: true})
      .pipe(map(data => Room.fromHttp(data)));
  }

  addRoom(newRoom: Room): Observable<Room> {
    return this.http.post<Room>(environment.restUrl + '/api/rooms', this.getCorrectedRoom(newRoom),
                          {withCredentials: true})
      .pipe(map(data => Room.fromHttp(data)));
  }

  private getCorrectedRoom(room: Room) {
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
    return correctedRoom;
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/rooms/' + id, {withCredentials: true});
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/users/' + id, {withCredentials: true});
  }

  resetUserPassword(id: number): Observable<any> {
    return this.http.get(environment.restUrl + '/api/users/resetPassword/' + id, {withCredentials: true});
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
    return this.http.put<Booking>(environment.restUrl + '/api/bookings', this.getCorrectedBooking(booking),
                          {withCredentials: true})
      .pipe(map(data => Booking.fromHttp(data)));
  }

  addBooking(newBooking: Booking): Observable<Booking> {
    return this.http.post<Booking>(environment.restUrl + '/api/bookings', this.getCorrectedBooking(newBooking),
                            {withCredentials: true})
      .pipe(map(data => Booking.fromHttp(data)));
  }

  private getCorrectedBooking(booking: Booking) {
    if (booking.startTime.length < 8) {
      booking.startTime = booking.startTime + ':00';
    }

    if (booking.endTime.length < 8) {
      booking.endTime = booking.endTime + ':00';
    }
    const correctedBooking = {
      id: booking.id,
      room: this.getCorrectedRoom(booking.room),
      user: booking.user,
      layout: this.getCorrectLayout(booking.layout),
      title: booking.title,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      participants: booking.participants
    };
    return correctedBooking;
  }

  private getCorrectLayout(layout: Layout) {
    let correctLayout;
    for (let member in Layout) {
      if (Layout[member] === layout) {
        correctLayout = member;
      }
    }
    return correctLayout;
  }

  deleteBooking(bookingId: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/bookings/' + bookingId, {withCredentials: true});
  }

  validateUser(name: string, password: string) : Observable<{result: string}> {
    const authData = btoa(`${name}:${password}`);
    const headers = new HttpHeaders().append('Authorization', 'Basic ' + authData);
    return this.http.get<{result: string}>(environment.restUrl + '/api/basicAuth/validate',
                                    {headers: headers, withCredentials: true});
  }

  getRole(): Observable<{role: string}> {
    const headers = new HttpHeaders().append('X-Requested-With', 'XMLHttpRequest');
    return this.http.get<{role: string}>(environment.restUrl + '/api/users/currentUserRole',
                                        {headers: headers, withCredentials: true});
  }
}
