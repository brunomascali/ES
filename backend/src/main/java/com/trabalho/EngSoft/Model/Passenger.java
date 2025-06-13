package com.trabalho.EngSoft.Model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Passenger implements Serializable {
    // Classe para guardar um passageiro e seu endereço em uma carona
    @ManyToOne
    @JoinColumn(name = "passenger_id", nullable = false)
    private User passenger;

    @Column(name = "address", nullable = false)
    private String address;
}
