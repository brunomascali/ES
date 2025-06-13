package com.trabalho.EngSoft.DTO;

import lombok.Data;

@Data
public class CreateRideRequest {
    private String driverCPF;
    private String startingAddress;
    private int availableSeats;
    private String arrivalTime;    
}
