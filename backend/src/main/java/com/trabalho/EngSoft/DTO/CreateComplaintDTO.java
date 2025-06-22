package com.trabalho.EngSoft.DTO;

import lombok.Data;

@Data
public class CreateComplaintDTO {
    private String user_from;
    private String user_to;
    private String description;
}
