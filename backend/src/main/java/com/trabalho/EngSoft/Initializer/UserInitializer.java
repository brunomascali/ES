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

            User admin = new User();
            admin.setName("Bruno Mascali Volkmer");
            admin.setPassword("123");
            admin.setEmail("bmvolkmer@inf.ufrgs.br");
            admin.setCpf("11111111111");
            admin.setDateOfBirth(dob);
            admin.setRoles(Set.of(passengerRole, adminRole));
            userRepository.save(admin);

            User driver = new User();
            driver.setName("Motorista da silva");
            driver.setPassword("123");
            driver.setEmail("motoristadasilva@inf.ufrgs.br");
            driver.setCpf("22222222222");
            driver.setDateOfBirth(dob);
            driver.setRoles(Set.of(passengerRole));
            userRepository.save(driver);

            User passenger = new User();
            passenger.setName("Maria da Silva");
            passenger.setPassword("123");
            passenger.setEmail("mariadasilva@ufrgs.br");
            passenger.setCpf("33333333333");
            passenger.setDateOfBirth(dob);
            passenger.setRoles(Set.of(passengerRole));
            userRepository.save(passenger);

            User passenger2 = new User();
            passenger2.setName("Roberto da Silva");
            passenger2.setPassword("123");
            passenger2.setEmail("robertodasilva@ufrgs.br");
            passenger2.setCpf("44444444444");
            passenger2.setDateOfBirth(dob);
            passenger2.setRoles(Set.of(passengerRole));
            userRepository.save(passenger2);
        }
    }
}
