package com.trabalho.EngSoft.Initializer;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.trabalho.EngSoft.Model.Enums.RoleName;
import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Repository.RoleRepository;
import com.trabalho.EngSoft.Repository.UserRepository;

@Component
@Order(2)
public class UserInitializer implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.ENGLISH);
            LocalDate dob = LocalDate.parse("1990-01-01", formatter);

            Role passengerRole = roleRepository.findByRole(RoleName.PASSENGER)
                    .orElseThrow(() -> new RuntimeException("Passenger ROLE not found"));
            Role driverRole = roleRepository.findByRole(RoleName.DRIVER)
                    .orElseThrow(() -> new RuntimeException("Passenger DRIVER not found"));
            Role adminRole = roleRepository.findByRole(RoleName.ADMIN)
                    .orElseThrow(() -> new RuntimeException("Passenger DRIVER not found"));

            User driver1 = new User();
            driver1.setName("Motorista um");
            driver1.setPassword("123");
            driver1.setEmail("m1@ufrgs.br");
            driver1.setCpf("11111111111");
            driver1.setDateOfBirth(dob);
            driver1.setRoles(Set.of(passengerRole));
            userRepository.save(driver1);

            User driver2 = new User();
            driver2.setName("Motorista dois");
            driver2.setPassword("123");
            driver2.setEmail("m2@ufrgs.br");
            driver2.setCpf("22222222222");
            driver2.setDateOfBirth(dob);
            driver2.setRoles(Set.of(passengerRole));
            userRepository.save(driver2);

            User passenger2 = new User();
            passenger2.setName("Passageiro um");
            passenger2.setPassword("123");
            passenger2.setEmail("p1@ufrgs.br");
            passenger2.setCpf("33333333333");
            passenger2.setDateOfBirth(dob);
            passenger2.setRoles(Set.of(passengerRole));
            userRepository.save(passenger2);

            User admin = new User();
            admin.setName("admin");
            admin.setPassword("123");
            admin.setEmail("admin@ufrgs.br");
            admin.setCpf("44444444444");
            admin.setDateOfBirth(dob);
            admin.setRoles(Set.of(passengerRole, adminRole));
            userRepository.save(admin);
        }
    }
}
