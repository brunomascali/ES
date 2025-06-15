package com.trabalho.EngSoft.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;
import java.util.HashSet;

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


    // Métodos auxiliares
    public boolean active(){
        return !(rideComplete) && (arrivalTime.compareTo(LocalTime.now()) > 0);
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