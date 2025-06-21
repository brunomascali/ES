package com.trabalho.EngSoft.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "ratings")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String userFrom;

    @Column(nullable = false)
    private String userTo;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private boolean driverRating;
}
