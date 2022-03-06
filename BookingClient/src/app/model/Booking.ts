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


  constructor(room?: Room, user?: User, layout?: Layout, title?: string, date?: string,
              startTime?: string, endTime?: string, participants?: number, id?: number) {
    if (room) {
      this.room = room;
    }
    if (user) {
      this.user = user;
    }
    if (layout) {
      this.layout = layout;
    }
    if (title) {
      this.title = title;
    }
    if (date) {
      this.date = date;
    }
    if (startTime) {
      this.startTime = startTime;
    }
    if (endTime) {
      this.endTime = endTime;
    }
    if (participants) {
      this.participants = participants;
    }
    if (id) {
      this.id = id;
    }
  }

  copyTo(other: Booking): Booking {
    other.room = this.room;
    other.user = this.user;
    other.layout = this.layout;
    other.title = this.title;
    other.date = this.date;
    other.startTime = this.startTime;
    other.endTime = this.endTime;
    other.participants = this.participants;
    return other;
  }

  public getDateAsDate(): Date {
    return new Date(this.date);
  }

  public isNew(): boolean {
    return this.id == null;
  }
}
