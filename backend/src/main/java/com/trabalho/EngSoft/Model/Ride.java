package com.trabalho.EngSoft.Model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "rides")
public class Ride {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JoinColumn(name = "driver_id")
    @ManyToOne
    private User driver;

    @Column(nullable = false)
    private String startAddress;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    @ElementCollection
    @CollectionTable(name = "ride_passengers", joinColumns = @JoinColumn(name = "ride_id"))
    private Set<Passenger> passengers = new HashSet<>();

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime arrivalTime;

    @Column(nullable = false)
    private boolean paymentComplete = false;

    @Column(nullable = false)
    private boolean rideComplete = false;

    @Column(nullable = false)
    private int availableSeats;

    @Column(nullable = false)
    private float price;

    private String description;

    // Métodos auxiliares
    public boolean active(){
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        
        if (date.equals(today)) {
            return !(rideComplete) && (arrivalTime.compareTo(now) > 0);
        } else {
            return !(rideComplete) && (date.isAfter(today));
        }
    }

    public boolean full(){
        return this.availableSeats == 0;
    }

    public boolean isUserInRide(User user){
        if (user.equals(driver))
            return true;

        for (Passenger p : passengers){
            if (user.equals(p.getPassenger()))
                return true;
        }

        return false;
    }

    public void decreaseAvailableSeats(){
        this.availableSeats--;
    }
}