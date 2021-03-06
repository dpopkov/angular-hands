package learn.ang.booking.config;

import learn.ang.booking.services.JwtService;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private JwtService jwtService;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        final Cookie[] cookies = request.getCookies();
        if (cookies == null || cookies.length == 0) {
            chain.doFilter(request, response);
            return;
        }
        Cookie tokenCookie = null;
        for (Cookie c : cookies) {
            if (c.getName().equals("token")) {
                tokenCookie = c;
                break;
            }
        }
        if (tokenCookie == null) {
            chain.doFilter(request, response);
            return;
        }
        if (jwtService == null) {
            ServletContext servletContext = request.getServletContext();
            WebApplicationContext appContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);
            jwtService = appContext.getBean(JwtService.class);
        }
        UsernamePasswordAuthenticationToken authentication = getAuthentication(tokenCookie.getValue());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String jwtToken) {
        try {
            String payload = jwtService.validateToken(jwtToken);
            JsonParser parser = JsonParserFactory.getJsonParser();
            Map<String, Object> payloadMap = parser.parseMap(payload);
            String user = payloadMap.get("user").toString();
            String role = payloadMap.get("role").toString();
            GrantedAuthority ga = new SimpleGrantedAuthority("ROLE_" + role);
            List<GrantedAuthority> roles = List.of(ga);
            return new UsernamePasswordAuthenticationToken(user, null, roles);
        } catch (Exception e) {
            // token is not valid
            return null;
        }
    }
}
