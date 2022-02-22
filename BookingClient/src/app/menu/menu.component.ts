import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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

}
