import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable, of} from "rxjs";
import {Booking} from "./model/Booking";
import {formatDate} from "@angular/common";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getRooms(): Observable<Array<Room>> {
    return of(null);
  }

  getUsers(): Observable<Array<User>> {
    return of(null);
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

  getUser(id: number) : Observable<User> {
    console.log('data.service.ts: getUser with id=', id)
    return this.http.get<User>(environment.restUrl + '/api/users/' + id);
  }

  updateUser(toUpdate: User): Observable<User> {
    return of(null);
  }

  addUser(newUser: User, password: string): Observable<User> {
    return of(null);
  }

  updateRoom(room: Room): Observable<Room> {
    return of(null);
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
