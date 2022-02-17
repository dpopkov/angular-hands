package learn.ang.booking.model.entities;

import learn.ang.booking.model.Layout;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@Getter
@Setter
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Room room;

    @ManyToOne
    private User user;

    @Enumerated(EnumType.STRING)
    private Layout layout;

    private String title;
    private Date date;
    private Time startTime;
    private Time endTime;
    private Integer participants;

    public Booking() {
    }

    public Booking(Room room, User user, Layout layout, String title, Date date, Time startTime, Time endTime, Integer participants) {
        this.room = room;
        this.user = user;
        this.layout = layout;
        this.title = title;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.participants = participants;
    }

    public Integer getDisplayDay() {
        return this.date.toLocalDate().getDayOfMonth();
    }

    public String getDisplayMonth() {
        return this.date.toLocalDate().getMonth().toString();
    }

    public String getDisplayDayOfWeek() {
        return this.date.toLocalDate().getDayOfWeek().toString();
    }
}
