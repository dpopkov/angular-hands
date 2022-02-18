package learn.ang.booking.controllers;

import learn.ang.booking.data.BookingRepository;
import learn.ang.booking.model.DateRequestCommand;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
public class BookingDisplayController {
    private final BookingRepository bookingRepository;

    public BookingDisplayController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("")
    public ModelAndView homePage() {
        Date date = new Date(new java.util.Date().getTime());
        return showCalendar(date);
    }

    @GetMapping("/calendar")
    public ModelAndView calendar(@RequestParam Date date) {
        return showCalendar(date);
    }

    private ModelAndView showCalendar(Date date) {
        Map<String,Object> model = new HashMap<>();
        model.put("dateRequest", new DateRequestCommand(date));
        model.put("bookings", bookingRepository.findAllByDate(date));
        return new ModelAndView ("home", model);
    }
}
