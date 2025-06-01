package com.trabalho.EngSoft.Initializer;

import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Model.RoleName;
import com.trabalho.EngSoft.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class RoleInitializer implements CommandLineRunner {
    @Autowired
    RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            Role role = new Role();
            role.setRole(RoleName.NOT_VERIFIED_USER);
            roleRepository.save(role);

            role = new Role();
            role.setRole(RoleName.PASSENGER);
            roleRepository.save(role);

            role = new Role();
            role.setRole(RoleName.DRIVER);
            roleRepository.save(role);

            role = new Role();
            role.setRole(RoleName.ADMIN);
            roleRepository.save(role);
        }
    }
}
