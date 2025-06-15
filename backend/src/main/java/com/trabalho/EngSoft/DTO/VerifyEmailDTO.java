package com.trabalho.EngSoft.DTO;

import lombok.Data;

@Data
public class VerifyEmailDTO {
    private String email;
    private String verificationCode;
}
