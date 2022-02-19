package learn.ang.booking.model;

import learn.ang.booking.model.entities.Booking;
import learn.ang.booking.model.entities.Room;
import learn.ang.booking.model.entities.User;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class BookingCommand {
    private Long id;
    private Room room;
    private User user;
    private Layout layout;
    private String title;
    private Date date;
    private String startTime;
    private String endTime;
    private Integer participants;

    public BookingCommand() {
    }

    public BookingCommand(Booking booking) {
        this.id = booking.getId();
        this.room = booking.getRoom();
        this.user = booking.getUser();
        this.layout = booking.getLayout();
        this.title = booking.getTitle();
        if (booking.getDate() != null) {
            this.date = booking.getDate();
        }
        if (booking.getStartTime() != null) {
            this.startTime = booking.getStartTime().toString();
        }
        if (booking.getEndTime() != null) {
            this.endTime = booking.getEndTime().toString();
        }
        this.participants = booking.getParticipants();
    }

    public Booking toBooking() {
        java.sql.Time xStartTime = java.sql.Time.valueOf(ensureTimeFormat(startTime));
        java.sql.Time xEndTime = java.sql.Time.valueOf(ensureTimeFormat(endTime));
        Booking booking = new Booking(room, user, layout, title, date, xStartTime, xEndTime, participants);
        booking.setId(id);
        return booking;
    }

    private String ensureTimeFormat(String time) {
        if (time.indexOf(':', 4) == -1) {
            return time + ":00";
        }
        return time;
    }
}
