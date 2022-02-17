package learn.ang.booking.model.entities;

import learn.ang.booking.model.Layout;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @NotBlank(message = "location cannot be blank")
    private String location;

    @OneToMany(cascade = {CascadeType.ALL})
    private List<LayoutCapacity> capacities;

    public Room() {
    }

    public Room(String name, String location) {
        this.name = name;
        this.location = location;
        capacities = new ArrayList<>();
        for (Layout layout : Layout.values()) {
            capacities.add(new LayoutCapacity(layout, 0));
        }
    }

    public void setCapacity(LayoutCapacity capacity) {
        for (LayoutCapacity lc : capacities) {
            if (lc.getLayout() == capacity.getLayout()) {
                lc.setCapacity(capacity.getCapacity());
            }
        }
    }
}
