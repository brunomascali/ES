package com.trabalho.EngSoft.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class SignupRequest {
    private String name;
    private String password;
    private String email;
    private String dateOfBirth;
}
