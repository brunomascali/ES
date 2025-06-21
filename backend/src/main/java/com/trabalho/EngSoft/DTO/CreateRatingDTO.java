package com.trabalho.EngSoft.DTO;

import lombok.Data;

@Data
public class CreateRatingDTO {
    private String user_from;
    private String user_to;
    private Integer rating;
    private String description;
    private Boolean driver_rating;
}

