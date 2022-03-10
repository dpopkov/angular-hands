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
  loadingData: boolean = true;
  message = 'Please wait... getting the list of users';

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getUsers().subscribe(
      (next) => {
        this.users = next;
        this.loadingData = false;
        this.processUrlParams();
      },
      (error) => {
        this.message = 'Sorry, an error has occurred - please contact support.'
      }
    )
  }

  private processUrlParams() {
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
