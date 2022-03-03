import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User";
import {DataService} from "../../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormResetService} from "../../form-reset.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // @ts-ignore
  users: Array<User>
  // @ts-ignore
  selectedUser: User;
  // @ts-ignore
  action: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(
      (next) => {
        this.users = next;
      }
    )
    this.route.queryParams.subscribe(
      (params) => {
        const idString = params['id'];
        if (idString) {
          const idNumber = +idString;
          // @ts-ignore
          this.selectedUser = this.users.find(user => user.id === idNumber);
        }
        this.action = params['action'];
      }
    )
  }

  setSelectedUser(userId: number): void {
    this.router.navigate(['admin', 'users'], {queryParams: {id: userId, action: 'view'}});
  }

  addUser(): void {
    this.selectedUser = new User();
    this.formResetService.resetUserFormEvent.emit(this.selectedUser);
    this.router.navigate(['admin', 'users'], {queryParams: {action: 'add'}});
  }
}
