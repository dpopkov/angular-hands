import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {FormResetService} from "../../../form-reset.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

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
  passwordIsValid = false;
  passwordsMatch = false;
  // @ts-ignore
  resetEventSubscription: Subscription;

  constructor(private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetUserFormEvent.subscribe(
      user => {
        this.user = user;
        this.initializeForm();
      }
    )
  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }

  private initializeForm() {
    this.formUser = Object.assign({}, this.user);
    this.checkIfNameIsValid();
    this.checkIfPasswordIsValid();
    this.checkIfPasswordsMatch();
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
    if (this.formUser.name) {
      this.nameIsValid = this.formUser.name.trim().length > 0;
    } else {
      this.nameIsValid = false;
    }
  }

  checkIfPasswordIsValid(): void {
    if (this.user.isNotNew()) {
      this.passwordIsValid = true;
    } else if (this.password) {
      this.passwordIsValid = this.password.trim().length > 0;
    } else {
      this.passwordIsValid = false;
    }
  }

  checkIfPasswordsMatch(): void {
    if (this.user.isNotNew()) {
      this.passwordsMatch = true;
    } else if (this.password && this.passwordDouble) {
      this.passwordsMatch = this.password === this.passwordDouble;
    } else {
      this.passwordsMatch = false;
    }
  }
}
