package learn.ang.booking.controllers;

import learn.ang.booking.data.BookingRepository;
import learn.ang.booking.data.RoomRepository;
import learn.ang.booking.data.UserRepository;
import learn.ang.booking.model.BookingCommand;
import learn.ang.booking.model.Layout;
import learn.ang.booking.model.entities.Booking;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/bookings")
@Slf4j
public class BookingController {
    private static final String BOOKINGS_EDIT = "bookings/edit";

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public BookingController(BookingRepository bookingRepository, RoomRepository roomRepository,
                             UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/edit")
    public ModelAndView editBooking(@RequestParam Long id) {
        return new ModelAndView(BOOKINGS_EDIT, getBookingFormModel(bookingRepository.findById(id).orElseThrow()));
    }

    @GetMapping("/new")
    public ModelAndView newBooking() {
        return new ModelAndView(BOOKINGS_EDIT, getBookingFormModel(new Booking()));
    }

    @PostMapping("/save")
    public String save(BookingCommand booking) {
        log.debug("Saving booking '{}'", booking.getTitle());
        bookingRepository.save(booking.toBooking());
        return "redirect:/";
    }

    @RequestMapping("/delete")
    public String delete(@RequestParam Long id) {
        log.debug("Deleting booking by id {}", id);
        bookingRepository.deleteById(id);
        return "redirect:/";
    }

    private Map<String,Object> getBookingFormModel(Booking booking) {
        Map<String,Object> model = new HashMap<>();
        model.put("booking",new BookingCommand(booking));
        model.put("rooms", roomRepository.findAll());
        model.put("layouts", Layout.values());
        model.put("users", userRepository.findAll());
        return model;
    }
}
