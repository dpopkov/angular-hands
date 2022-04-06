import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  role: string;
  roleSetEvent = new EventEmitter<string>();

  constructor(private dataService: DataService) {
  }

  authenticate(name: string, password: string) {
    this.dataService.validateUser(name, password).subscribe(
      next => {
        this.setupRole();
        this.setIsAuthenticated(true);
      },
      error => {
        this.setIsAuthenticated(false);
      }
    )
  }

  setupRole(): void {
    this.dataService.getRole().subscribe(
      next => {
        this.setRole(next.role);
      }
    )
  }

  checkIfAlreadyAuthenticated() {
    this.dataService.getRole().subscribe(
      next => {
        if (next.role !== '') {
          this.setRole(next.role);
          this.setIsAuthenticated(true);
        }
      }
    )
  }

  logout() {
    this.dataService.logout().subscribe();
    this.setIsAuthenticated(false);
    this.setRole('');
  }

  private setRole(role: string): void {
    this.role = role;
    this.roleSetEvent.emit(this.role);
  }

  private setIsAuthenticated(value: boolean): void {
    this.isAuthenticated = value;
    this.authenticationResultEvent.emit(this.isAuthenticated);
  }
}
