package com.trabalho.EngSoft.DTO;

import lombok.Data;

@Data
public class CreateRideDTO {
    private String driverCPF;
    private String startingAddress;
    private double latitude;
    private double longitude;
    private int availableSeats;
    private String date;
    private String arrivalTime;
    private String description;
    private float price;
}
