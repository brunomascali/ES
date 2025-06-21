package com.trabalho.EngSoft.DTO;

import lombok.Data;

@Data
public class CreateRatingDTO {
    private Long user_from;
    private Long user_to;
    private Integer rating;
    private String description;
    private Boolean driver_rating;
}

