package learn.ang.booking.controllers;

import learn.ang.booking.data.UserRepository;
import learn.ang.booking.model.entities.User;
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

@Controller
@RequestMapping("/users")
@Slf4j
public class UserController {

    private static final String REDIRECT_USERS = "redirect:/users";
    private static final String USERS_EDIT = "users/edit";

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("")
    public ModelAndView listUsers() {
        return new ModelAndView("users/list", "users", userRepository.findAll());
    }

    @GetMapping("/add")
    public ModelAndView addRoom() {
        return new ModelAndView(USERS_EDIT, "user", new User());
    }

    @GetMapping("/edit")
    public ModelAndView editUser(@RequestParam Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return new ModelAndView(USERS_EDIT, "user", user);
    }

    @PostMapping("/save")
    public Object saveUser(@Valid User user, BindingResult bindingResult, RedirectAttributes attributes) {
        if (bindingResult.hasErrors()) {
            return new ModelAndView(USERS_EDIT, "user", user);
        }
        log.debug("Saving user: {}", user.getName());
        //todo: the password should be encoded before it's saved!
        userRepository.save(user);
        return REDIRECT_USERS;
    }

    @RequestMapping("/delete")
    public String deleteUser(@RequestParam Long userId) {
        log.debug("Deleting user by id={}", userId);
        userRepository.deleteById(userId);
        return REDIRECT_USERS;
    }

    @RequestMapping("/resetPW")
    public String resetUserPW(@RequestParam Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        log.debug("Resetting user {}'s password", user.getName());
        user.setPassword("123");
        userRepository.save(user);
        return REDIRECT_USERS;
    }
}
