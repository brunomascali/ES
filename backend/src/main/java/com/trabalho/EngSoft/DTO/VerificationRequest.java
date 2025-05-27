package com.trabalho.EngSoft.DTO;

import lombok.Data;

@Data
public class VerificationRequest {
    private String email;
    private int verificationCode;
}
