package learn.ang.booking.rest;

import learn.ang.booking.data.UserRepository;
import learn.ang.booking.model.AngularUser;
import learn.ang.booking.model.entities.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@Slf4j
public class RestUserController {
    private final UserRepository userRepository;

    public RestUserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<AngularUser> getAllUsers() {
        return userRepository.findAll().stream().map(AngularUser::new).collect(Collectors.toList());
    }

    @GetMapping("/{userId}")
    public AngularUser getUser(@PathVariable Long userId) {
        log.debug("getUser(userId={})", userId);
        return new AngularUser(userRepository.findById(userId).orElseThrow());
    }

    @PostMapping
    public AngularUser addUser(@RequestBody AngularUser newUser) {
        return new AngularUser(userRepository.save(newUser.asUser()));
    }

    @PutMapping
    public AngularUser updateUser(@RequestBody AngularUser updateUser) {
        User original = userRepository.findById(updateUser.getId()).orElseThrow();
        original.updateFrom(updateUser.asUser());
        return new AngularUser(userRepository.save(original));
    }
}
