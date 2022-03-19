package learn.ang.booking.rest;

import learn.ang.booking.data.UserRepository;
import learn.ang.booking.model.AngularUser;
import learn.ang.booking.model.entities.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Map;
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

    @GetMapping("/currentUserRole")
    public Map<String, String> getCurrentUserRole() {
        Collection<? extends GrantedAuthority> roles = SecurityContextHolder.getContext()
                .getAuthentication().getAuthorities();
        String role = "";
        if (roles.size() > 0) {
            GrantedAuthority ga = roles.iterator().next();
            role = ga.getAuthority().substring("ROLE_".length());
        }
        log.debug("return role: {}", role);
        return Map.of("role", role);
    }

    @PostMapping
    public AngularUser addUser(@RequestBody User newUser) {
        return new AngularUser(userRepository.save(newUser));
    }

    @PutMapping
    public AngularUser updateUser(@RequestBody AngularUser updateUser) {
        User original = userRepository.findById(updateUser.getId()).orElseThrow();
        original.updateFrom(updateUser.asUser());
        return new AngularUser(userRepository.save(original));
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userRepository.deleteById(userId);
    }

    @GetMapping("/resetPassword/{userId}")
    public void resetPassword(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setPassword("secret");
        userRepository.save(user);
    }
}
