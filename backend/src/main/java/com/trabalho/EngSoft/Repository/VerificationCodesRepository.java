package com.trabalho.EngSoft.Repository;

import com.trabalho.EngSoft.Model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationCodesRepository extends JpaRepository<VerificationCode, Long> {
    Optional<VerificationCode> findByEmail(String email);
    Optional<VerificationCode> findByCode(int code);
}
