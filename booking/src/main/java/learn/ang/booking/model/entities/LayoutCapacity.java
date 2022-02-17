package learn.ang.booking.model.entities;

import learn.ang.booking.model.Layout;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class LayoutCapacity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Enumerated(EnumType.STRING)
    private Layout layout;
    private Integer capacity;

    public LayoutCapacity() {
    }

    public LayoutCapacity(Layout layout, Integer capacity) {
        this.layout = layout;
        this.capacity = capacity;
    }
}
