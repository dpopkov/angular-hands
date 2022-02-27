import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../model/User";

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

  constructor() { }

  ngOnInit(): void {
    this.formUser = Object.assign({}, this.user);
  }

  onSubmit(): void {
    console.log('We need to save the user', this.formUser);
  }
}
