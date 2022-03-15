import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RoomsComponent } from './admin/rooms/rooms.component';
import { UsersComponent } from './admin/users/users.component';
import {RouterModule, Routes} from "@angular/router";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoomDetailComponent } from './admin/rooms/room-detail/room-detail.component';
import { UserDetailComponent } from './admin/users/user-detail/user-detail.component';
import { UserEditComponent } from './admin/users/user-edit/user-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RoomEditComponent } from './admin/rooms/room-edit/room-edit.component';
import { BookingEditComponent } from './calendar/booking-edit/booking-edit.component';
import {HttpClientModule} from "@angular/common/http";
import {PrefetchRoomsService} from "./prefetch-rooms.service";
import {PrefetchUsersService} from "./prefetch-users.service";
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path : 'admin/users', component : UsersComponent},
  {path : 'admin/rooms', component : RoomsComponent},
  {path : '', component : CalendarComponent},
  {
    path : 'bookingEdit',
    component : BookingEditComponent,
    resolve : {
      rooms : PrefetchRoomsService,
      users : PrefetchUsersService
    }
  },
  {
    path : 'bookingAdd',
    component : BookingEditComponent,
    resolve : {
      rooms : PrefetchRoomsService,
      users : PrefetchUsersService
    }
  },
  {path : '404', component : PageNotFoundComponent},
  {path : '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CalendarComponent,
    RoomsComponent,
    RoomDetailComponent,
    UsersComponent,
    PageNotFoundComponent,
    UserDetailComponent,
    UserEditComponent,
    RoomEditComponent,
    BookingEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
