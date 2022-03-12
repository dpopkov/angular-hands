package learn.ang.booking.rest;

import learn.ang.booking.data.BookingRepository;
import learn.ang.booking.model.entities.Booking;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class RestBookingController {
    private final BookingRepository bookingRepository;

    public RestBookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/{date}")
    public List<Booking> getBookingsByDate(@PathVariable String date) {
        return bookingRepository.findAllByDate(Date.valueOf(date));
    }

    @DeleteMapping("/{bookingId}")
    public void deleteBooking(@PathVariable Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }
}
