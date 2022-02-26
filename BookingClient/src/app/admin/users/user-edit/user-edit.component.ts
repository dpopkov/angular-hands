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

  constructor() { }

  ngOnInit(): void {
  }

}
