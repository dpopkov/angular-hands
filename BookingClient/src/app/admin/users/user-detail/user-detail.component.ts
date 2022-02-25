import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../model/User";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input()
  // @ts-ignore
  user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
