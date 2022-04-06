import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  showLogout: boolean = false;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.showLogout = this.authService.isAuthenticated;
    this.authService.authenticationResultEvent.subscribe(
      next => {
        this.showLogout = next;
      }
    )
  }

  navigateToHome(): void {
    this.router.navigate(['']);
  }

  navigateToRoomsAdmin(): void {
    this.router.navigate(['admin', 'rooms']);
  }

  navigateToUsersAdmin(): void {
    this.router.navigate(['admin', 'users']);
  }

  logout(): void {
    this.authService.logout();
    this.navigateToHome();
  }

}
