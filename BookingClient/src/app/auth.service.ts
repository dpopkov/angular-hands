import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();

  constructor(private dataService: DataService) {
  }

  authenticate(name: string, password: string) {
    this.dataService.validateUser(name, password).subscribe(
      next => {
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
      },
      error => {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      }
    )
  }

  getRole(): string {
    /*
    if (this.jwtToken == null) {
      return null;
    }
    const encodedPayload = this.jwtToken.split('.')[1];
    const payload = atob(encodedPayload);
    console.log('AuthService:getRole:payload=', payload);
    let parsedRole = JSON.parse(payload).role;
    console.log('AuthService:getRole:role=', parsedRole);
    return parsedRole;
    */
    return "ADMIN"; // todo: this constant role is temporary, need to fix it later
  }
}
