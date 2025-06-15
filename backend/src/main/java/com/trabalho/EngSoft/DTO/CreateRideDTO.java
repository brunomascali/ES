package com.trabalho.EngSoft.DTO;

import lombok.Data;

@Data
public class CreateRideDTO {
    private String driverCPF;
    private String startingAddress;
    private int availableSeats;
    private String arrivalTime;    
}
