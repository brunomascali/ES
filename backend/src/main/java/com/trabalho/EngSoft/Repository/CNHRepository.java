package com.trabalho.EngSoft.Repository;

import com.trabalho.EngSoft.Model.CNH;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CNHRepository extends JpaRepository<CNH, Long> {
    Optional<CNH> findByCpf(String cpf);
}