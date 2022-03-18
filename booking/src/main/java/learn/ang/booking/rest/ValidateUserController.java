package learn.ang.booking.rest;

import learn.ang.booking.services.JwtService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping("/api/basicAuth")
public class ValidateUserController {

    private final JwtService jwtService;

    public ValidateUserController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @RequestMapping("/validate")
    public Map<String, String> userIsValid(HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // Important: using org.springframework.security.core.userdetails.User
        User currentUser = (User) authentication.getPrincipal();
        String name = currentUser.getUsername();
        // We expect the user to have one role such as "role_admin" or "role_user".
        String role = currentUser.getAuthorities().toArray()[0].toString().substring(5);
        String token = jwtService.generateToken(name, role);
        final Map<String, String> validationResult = Map.of("result", token);
        Cookie cookie = new Cookie("token", token);
        response.addCookie(cookie);
        return validationResult;
    }
}
