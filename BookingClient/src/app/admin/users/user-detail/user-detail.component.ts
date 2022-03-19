import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from "../../../model/User";
import {Router} from "@angular/router";
import {DataService} from "../../../data.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../auth.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  @Input()
  // @ts-ignore
  user: User;

  @Output()
  dataChangedEvent = new EventEmitter();

  message = '';
  isAdminUser: boolean = false;
  subscription: Subscription;

  constructor(private router: Router,
              private dataService: DataService,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.role === 'ADMIN') {
      this.isAdminUser = true;
    }
    this.subscription = this.authService.roleSetEvent.subscribe(
      next => {
        this.isAdminUser = (next === 'ADMIN');
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editUser(): void {
    this.router.navigate(['admin', 'users'], {queryParams: {id: this.user.id, action: 'edit'}});
  }

  deleteUser(): void {
    const deleteConfirmed = confirm('Are you sure you wish to delete this user?');
    if (deleteConfirmed) {
      this.message = 'Deleting...';
      this.dataService.deleteUser(this.user.id).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'users'])
        },
        error => this.message = 'Sorry, this user cannot be deleted at this time.'
      )
    }
  }

  resetPassword(): void {
    this.message = 'Please wait...';
    this.dataService.resetUserPassword(this.user.id).subscribe(
      next => this.message = 'The password has been reset.',
      error => this.message = 'Sorry, something went wrong.'
    );
  }
}
