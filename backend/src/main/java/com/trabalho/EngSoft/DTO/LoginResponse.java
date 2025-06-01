package com.trabalho.EngSoft.DTO;

import com.trabalho.EngSoft.Model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String name;
    private String email;
    private String cpf;
    private Set<String> roles;
}
