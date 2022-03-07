package learn.ang.booking.rest;

import learn.ang.booking.data.RoomRepository;
import learn.ang.booking.model.entities.Room;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RestRoomController {
    private final RoomRepository roomRepository;

    public RestRoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @GetMapping("/{roomId}")
    public Room getRoom(@PathVariable Long roomId) {
        return roomRepository.findById(roomId).orElseThrow();
    }

    @PostMapping
    public Room addRoom(@RequestBody Room room) {
        return roomRepository.save(room);
    }

    @PutMapping
    public Room updateRoom(@RequestBody Room updateRoom) {
        Room original = roomRepository.findById(updateRoom.getId()).orElseThrow();
        original.updateFrom(updateRoom);
        return roomRepository.save(original);
    }
}
