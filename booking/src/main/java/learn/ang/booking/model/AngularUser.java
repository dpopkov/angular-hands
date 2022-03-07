package learn.ang.booking.model;

import learn.ang.booking.model.entities.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AngularUser {
    private Long id;
    private String name;

    public AngularUser() {
    }

    public AngularUser(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public AngularUser(User user) {
        this.id = user.getId();
        this.name = user.getName();
    }

    public User asUser() {
        User newUser = new User();
        newUser.setId(this.id);
        newUser.setName(this.name);
        newUser.setPassword("");
        return newUser;
    }
}
