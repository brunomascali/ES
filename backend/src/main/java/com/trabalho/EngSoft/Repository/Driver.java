package com.trabalho.EngSoft.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Driver extends JpaRepository<com.trabalho.EngSoft.Model.Driver, Long> {
    Optional<com.trabalho.EngSoft.Model.Driver> findByDriverId(Long id);
}
