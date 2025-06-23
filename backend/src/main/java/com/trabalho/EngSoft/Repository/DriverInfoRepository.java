package com.trabalho.EngSoft.Repository;

import com.trabalho.EngSoft.Model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DriverInfoRepository extends JpaRepository<Driver, Long> {
    Optional<Driver> findByDriverId(Long id);
}
