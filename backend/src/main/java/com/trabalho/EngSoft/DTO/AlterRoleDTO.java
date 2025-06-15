package com.trabalho.EngSoft.DTO;

import lombok.Data;

@Data
public class AlterRoleDTO {
    private String email;
    private String role;
    // action = add | remove
    private String action;
}
