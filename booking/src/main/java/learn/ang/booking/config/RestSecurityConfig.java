package learn.ang.booking.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class RestSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("james").password("{noop}123").authorities("ROLE_ADMIN")
                .and()
                .withUser("jane").password("{noop}123").authorities("ROLE_USER");
        // todo: this password should be encoded
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/api/basicAuth/**").permitAll()
                .antMatchers("/api/basicAuth/**").hasAnyRole("ADMIN", "USER")
                .and()
                .httpBasic();
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/bookings/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/**").hasAnyRole("ADMIN", "USER")
                .antMatchers("/api/**").hasRole("ADMIN")
                .and()
                .addFilter(new JwtAuthorizationFilter(authenticationManager()));
    }
}
