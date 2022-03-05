import {Layout, Room} from "./Room";
import {User} from "./User";

export class Booking {
  // @ts-ignore
  id: number;
  room: Room;
  user: User;
  layout: Layout;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: number;


  constructor(room: Room, user: User, layout: Layout, title: string, date: string,
              startTime: string, endTime: string, participants: number, id?: number) {
    this.room = room;
    this.user = user;
    this.layout = layout;
    this.title = title;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.participants = participants;
    if (id) {
      this.id = id;
    }
  }

  public getDateAsDate(): Date {
    return new Date(this.date);
  }
}
