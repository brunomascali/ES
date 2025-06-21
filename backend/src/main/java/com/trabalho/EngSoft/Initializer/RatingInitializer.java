package com.trabalho.EngSoft.Initializer;

import com.trabalho.EngSoft.Model.Rating;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Repository.RatingRepository;
import com.trabalho.EngSoft.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Order(3) // Run after UserInitializer
public class RatingInitializer implements CommandLineRunner {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if (ratingRepository.count() == 0) {
            List<User> users = userRepository.findAll();

            User bruno = users.stream().filter(u -> u.getEmail().equals("bmvolkmer@inf.ufrgs.br")).findFirst().orElseThrow();
            User motorista = users.stream().filter(u -> u.getEmail().equals("motoristadasilva@inf.ufrgs.br")).findFirst().orElseThrow();
            User maria = users.stream().filter(u -> u.getEmail().equals("mariadasilva@ufrgs.br")).findFirst().orElseThrow();
            User roberto = users.stream().filter(u -> u.getEmail().equals("robertodasilva@ufrgs.br")).findFirst().orElseThrow();

            Rating r1 = new Rating();
            r1.setUserFrom(maria.getId());
            r1.setUserTo(bruno.getId());
            r1.setRating(5);
            r1.setDescription("Bruno foi um ótimo motorista!");
            r1.setDriverRating(true);

            Rating r2 = new Rating();
            r2.setUserFrom(roberto.getId());
            r2.setUserTo(bruno.getId());
            r2.setRating(4);
            r2.setDescription("Viagem agradável com Bruno.");
            r2.setDriverRating(true);

            Rating r3 = new Rating();
            r3.setUserFrom(motorista.getId());
            r3.setUserTo(bruno.getId());
            r3.setRating(5);
            r3.setDescription("Bruno foi um passageiro exemplar.");
            r3.setDriverRating(false);

            Rating r4 = new Rating();
            r4.setUserFrom(maria.getId());
            r4.setUserTo(bruno.getId());
            r4.setRating(3);
            r4.setDescription("Bruno atrasou um pouco, mas foi educado.");
            r4.setDriverRating(false);

            ratingRepository.saveAll(List.of(r1, r2, r3, r4));
        }
    }
}

