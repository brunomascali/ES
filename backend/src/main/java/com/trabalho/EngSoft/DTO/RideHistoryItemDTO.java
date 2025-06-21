// backend/src/main/java/com/trabalho/EngSoft/DTO/RideHistoryItemDTO.java
package com.trabalho.EngSoft.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RideHistoryItemDTO {
    private Long id;
    private int days;
    private LocalTime time;
    private String startAddress;
    private float price;
    private String userRole; 

    private String driverName; // campo exclusivo se o user for passageiro
    private Integer totalPassengers;  // campo exclusivo se for motorista
    private String passengerPickupAddress; // campo exclusivo se o user for passageiro
    
}