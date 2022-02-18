package learn.ang.booking.controllers;

import learn.ang.booking.data.RoomRepository;
import learn.ang.booking.model.entities.Room;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/rooms")
@Slf4j
public class RoomController {
    private static final String ROOMS_LIST = "rooms/list";
    private static final String ROOMS_EDIT = "rooms/edit";
    private static final String REDIRECT_ROOMS = "redirect:/rooms";

    private final RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @GetMapping("")
    public ModelAndView listRooms() {
        return new ModelAndView(ROOMS_LIST, "rooms", roomRepository.findAll());
    }

    @GetMapping("/add")
    public ModelAndView addRoom() {
        Map<String,Object> model = new HashMap<>();
        model.put("room", new Room("",""));
        return new ModelAndView(ROOMS_EDIT, model);
    }

    @GetMapping("/edit")
    public ModelAndView editRoom(@RequestParam Long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow();
        Map<String,Object> model = new HashMap<>();
        model.put("room", room);
        return new ModelAndView(ROOMS_EDIT, model);
    }

    @PostMapping("/save")
    public Object saveRoom(@Valid Room room, BindingResult bindingResult, RedirectAttributes attributes) {
        if (bindingResult.hasErrors()) {
            Map<String,Object> model = new HashMap<>();
            model.put("room", room);
            return new ModelAndView(ROOMS_EDIT, model);
        }
        log.debug("Saving room '{}'", room.getName());
        roomRepository.save(room);
        return REDIRECT_ROOMS;
    }

    @RequestMapping("/delete")
    public String deleteRoom(@RequestParam Long roomId) {
        log.debug("Deleting room by id {}", roomId);
        roomRepository.deleteById(roomId);
        return REDIRECT_ROOMS;
    }
}
