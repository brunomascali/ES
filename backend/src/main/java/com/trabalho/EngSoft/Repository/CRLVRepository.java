package com.trabalho.EngSoft.Repository;

import com.trabalho.EngSoft.Model.CRLV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CRLVRepository extends JpaRepository<CRLV, Long> {
    Optional<CRLV> findByPlate(String plate);
}
