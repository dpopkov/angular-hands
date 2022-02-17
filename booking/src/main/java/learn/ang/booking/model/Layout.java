package learn.ang.booking.model;

public enum Layout {
    THEATER("Theater"),
    USHAPE("U-Shape"),
    BOARD("Board Meeting");

    private final String description;

    Layout(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
