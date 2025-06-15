package com.trabalho.EngSoft.Initializer;

import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Model.Enums.RoleName;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Repository.RoleRepository;
import com.trabalho.EngSoft.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Set;

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

            // Usuario já cadastrado como motorista
            User driver1 = new User();
            driver1.setName("Bruno Mascali Volkmer");
            driver1.setPassword("123");
            driver1.setEmail("bmvolkmer@inf.ufrgs.br");
            driver1.setCpf("11111111111");
            driver1.setDateOfBirth(dob);
            driver1.setRoles(Set.of(passengerRole));
            userRepository.save(driver1);

            // Usuario não cadastrado como motorista mas possui CNH
            User driver2 = new User();
            driver2.setName("Maria da Silva");
            driver2.setPassword("123");
            driver2.setEmail("mariadasilva@ufrgs.br");
            driver2.setCpf("22222222222");
            driver2.setDateOfBirth(dob);
            driver2.setRoles(Set.of(passengerRole));
            userRepository.save(driver2);

            // Usuário não cadastrado como motorista e que não possui CNH
            User passenger = new User();
            passenger.setName("Roberto da Silva");
            passenger.setPassword("123");
            passenger.setEmail("robertodasilva@ufrgs.br");
            passenger.setCpf("33333333333");
            passenger.setDateOfBirth(dob);
            passenger.setRoles(Set.of(passengerRole));
            userRepository.save(passenger);
        }
    }
}
