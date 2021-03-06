import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {Observable} from "rxjs";
import {User} from "./model/User";
import {Resolve} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PrefetchUsersService implements Resolve<Observable<Array<User>>>{

  constructor(private dataService: DataService) { }

  resolve(): Observable<Array<User>> {
    return this.dataService.getUsers();
  }
}
