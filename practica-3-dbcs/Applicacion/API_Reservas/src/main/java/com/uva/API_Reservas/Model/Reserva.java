package com.uva.API_Reservas.Model;


import javax.persistence.*;
import java.time.LocalDate;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Reserva")
public class Reserva {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private int id;

    @Size(max=20)
    private String guestName;

    private String guestEmail;

    private double price;

    private int units;

    private int numGuest;

    private LocalDate dateIn;

    private LocalDate dateOut;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDate created_at;

    private LocalDate updated_at;

    public Reserva() {
    }

    public Reserva(String guestName, String guestEmail, int units, int numGuest, LocalDate dateIn, LocalDate dateOut) {
        Details details = new Details();
        this.guestName = guestName;
        this.guestEmail = guestEmail;
        this.price = dateIn.datesUntil(dateOut).count()*details.getPrecio_dia()*units;
        this.units = units;
        this.numGuest = numGuest;
        this.dateIn = dateIn;
        this.dateOut = dateOut;
        this.status = Status.Pending;
        this.created_at = LocalDate.now();
        this.updated_at = LocalDate.now();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGuestName() {
        return guestName;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }

    public String getGuestEmail() {
        return guestEmail;
    }

    public void setGuestEmail(String guestEmail) {
        this.guestEmail = guestEmail;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getUnits() {
        return units;
    }

    public void setUnits(int units) {
        this.units = units;
    }

    public int getNumGuest() {
        return numGuest;
    }

    public void setNumGuest(int numGuest) {
        this.numGuest = numGuest;
    }

    public LocalDate getDateIn() {
        return dateIn;
    }

    public void setDateIn(LocalDate dateIn) {
        this.dateIn = dateIn;
    }

    public LocalDate getDateOut() {
        return dateOut;
    }

    public void setDateOut(LocalDate dateOut) {
        this.dateOut = dateOut;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDate getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDate created_at) {
        this.created_at = created_at;
    }

    public LocalDate getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDate updated_at) {
        this.updated_at = updated_at;
    }
}
