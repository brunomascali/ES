package com.trabalho.EngSoft.DTO;

import lombok.Data;

@Data
public class AcceptRideRequest {
    private long rideID;
    private String userCPF;
    private String userAddress;
}
