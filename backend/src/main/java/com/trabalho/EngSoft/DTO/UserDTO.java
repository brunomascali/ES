package com.trabalho.EngSoft.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class UserDTO {
    private String name;
    private String email;
    private String cpf;
    private Set<String> roles;
}
