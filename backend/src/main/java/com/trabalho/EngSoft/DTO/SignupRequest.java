package com.trabalho.EngSoft.DTO;

import lombok.Data;

@Data
public class SignupRequest {
    private String name;
    private String password;
    private String email;
    private String cpf;
    private String dateOfBirth;
}
