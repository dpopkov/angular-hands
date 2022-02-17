package learn.ang.booking.controllers;

import learn.ang.booking.data.BookingRepository;
import learn.ang.booking.data.RoomRepository;
import learn.ang.booking.data.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/bookings")
public class BookingController {
    BookingRepository bookingRepository;
    RoomRepository roomRepository;
    UserRepository userRepository;
}
