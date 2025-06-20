package com.trabalho.EngSoft.DTO;

import lombok.Data;

@Data
public class DriverValidationDTO {
    private String cnh;
    private String cpf;
    private String plate;

    private String color;
    private String model;
}
