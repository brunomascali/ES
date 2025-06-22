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
@Table(name = "complaints")
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String user_from;

    @Column(nullable = false)
    private String user_to;

    @Column(nullable = false)
    private String description;

    // open | banned | notbanned
    @Column(nullable = false)
    private String status;
}