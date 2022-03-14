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

    @GetMapping("/{date}")
    public List<Booking> getBookingsByDate(@PathVariable String date) {
        return bookingRepository.findAllByDate(Date.valueOf(date));
    }

    @GetMapping
    public Booking getBooking(@RequestParam("id") Long bookingId) {
        return bookingRepository.findById(bookingId).orElseThrow();
    }

    @DeleteMapping("/{bookingId}")
    public void deleteBooking(@PathVariable Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @PutMapping
    public Booking updateBooking(@RequestBody Booking booking) {
        Booking original = bookingRepository.findById(booking.getId()).orElseThrow();
        original = original.updateFrom(booking);
        return bookingRepository.save(original);
    }

    @PostMapping
    public Booking newBooking(@RequestBody Booking booking) {
        return bookingRepository.save(booking);
    }
}
