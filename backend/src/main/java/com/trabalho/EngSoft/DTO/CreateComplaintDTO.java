package com.trabalho.EngSoft.DTO;

import lombok.Data;

@Data
public class CreateComplaintDTO {
    private Long user_id_from;
    private Long user_id_to;
    private String description;
}
