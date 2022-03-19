import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  role: string;

  constructor(private dataService: DataService) {
  }

  authenticate(name: string, password: string) {
    this.dataService.validateUser(name, password).subscribe(
      next => {
        this.setupRole();
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
      },
      error => {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      }
    )
  }

  setupRole(): void {
    this.dataService.getRole().subscribe(
      next => {
        this.role = next.role;
        console.log('AuthService:setupRole:this.role=', this.role);
      }
    )
  }

  roleIsAdmin(): boolean {
    const isAdmin = this.role === 'ADMIN';
    console.log('AuthService:roleIsAdmin:isAdmin=', isAdmin); // for debug
    return isAdmin;
  }

  checkIfAlreadyAuthenticated() {
    this.dataService.getRole().subscribe(
      next => {
        if (next.role !== '') {
          this.isAuthenticated = true;
          this.authenticationResultEvent.emit(true);
        }
      }
    )
  }
}
