package com.trabalho.EngSoft.Initializer;

import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class RoleInitializer implements CommandLineRunner {
    @Autowired
    RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            Role role = new Role();
            role.setName("ADMIN");
            roleRepository.save(role);

            role = new Role();
            role.setName("USUARIO");
            roleRepository.save(role);

            role = new Role();
            role.setName("PASSAGEIRO");
            roleRepository.save(role);

            role = new Role();
            role.setName("MOTORISTA");
            roleRepository.save(role);
        }
    }
}
