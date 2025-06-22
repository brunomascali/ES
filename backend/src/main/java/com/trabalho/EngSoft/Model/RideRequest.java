package com.trabalho.EngSoft.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "ride_requests")
public class RideRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private long rideId;

    @Column(nullable = false)
    private String userCPF;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String userAddress;

    @Column(nullable = false)
    private boolean accepted;

    @Column(nullable = false)
    private boolean paid;
}
