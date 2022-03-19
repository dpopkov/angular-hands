package learn.ang.booking.rest;

import learn.ang.booking.services.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
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
        final Object principal = authentication.getPrincipal();
        log.debug("principal: {}", principal);
        User currentUser = (User) principal;
        String name = currentUser.getUsername();
        // We expect the user to have one role such as "role_admin" or "role_user".
        String role = currentUser.getAuthorities().toArray()[0].toString().substring(5);
        String token = jwtService.generateToken(name, role);
        Cookie cookie = new Cookie("token", token);
        cookie.setPath("/api");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(30 * 60);  // 30 minutes = 1800 seconds
        // This cookie should only be sent over SSL - We need this when we deploy to a live server
        // The line below is commented out for developing and testing in local environment
        // TODO: when in prod must cookie.setSecure(true);
        response.addCookie(cookie);
        return Map.of("result", "ok");
    }
}
