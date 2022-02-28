import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input()
  // @ts-ignore
  user: User;
  // @ts-ignore
  formUser: User;
  // @ts-ignore
  message: string;
  // @ts-ignore
  password: string;
  // @ts-ignore
  passwordDouble: string;
  nameIsValid = false;

  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formUser = Object.assign({}, this.user);
    this.checkIfNameIsValid();
  }

  onSubmit(): void {
    if (this.formUser.id == null) {
      this.dataService.addUser(this.formUser, this.password).subscribe(
        (user) => {
          // If we get that event it means that our user has been successfully added
          this.navigateToView(user);
        }
      )
    } else {
      this.dataService.updateUser(this.formUser).subscribe(
        (user) => {
          // If we get that event it means that our user has been successfully updated
          this.navigateToView(user);
        }
      );
    }
  }

  private navigateToView(user: User) {
    this.router.navigate(['admin', 'users'], {queryParams: {id: user.id, action: 'view'}});
  }

  checkIfNameIsValid(): void {
    this.nameIsValid = this.formUser.name.trim().length > 0;
  }
}
