package com.trabalho.EngSoft.Repository;

import com.trabalho.EngSoft.Model.DriverInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DriverInfoRepository extends JpaRepository<DriverInfo, Long> {
    Optional<DriverInfo> findByDriverId(Long id);
}
