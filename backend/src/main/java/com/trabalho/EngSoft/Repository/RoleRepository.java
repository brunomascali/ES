package com.trabalho.EngSoft.Repository;

import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Model.Enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRole(RoleName role);
}

