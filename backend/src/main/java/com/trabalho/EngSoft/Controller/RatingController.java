package com.trabalho.EngSoft.Controller;

import com.trabalho.EngSoft.Model.Rating;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Repository.RatingRepository;
import com.trabalho.EngSoft.Repository.UserRepository;
import com.trabalho.EngSoft.DTO.CreateRatingDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/rating")
public class RatingController {

    @Autowired
    RatingRepository ratingRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("")
    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }

    // Todas as avaliações dadas a um certo usuário
    @GetMapping("/of/{user_cpf}")
    public List<Rating> getUserRatings(@PathVariable String user_cpf) {
        Optional<User> user_opt = userRepository.findByCpf(user_cpf);
        if (user_opt.isEmpty()) {
            return new ArrayList<>();
        }

        return ratingRepository.findByUserTo(user_opt.get().getCpf());
    }

    // Média de avaliação de um passageiro
    @GetMapping("/avg/passenger/{user_cpf}")
    public Double getPassengerAverageRating(@PathVariable String user_cpf) {
        List<Rating> ratings = getUserRatings(user_cpf);

        OptionalDouble avgRating = ratings.stream().filter(r -> !r.isDriverRating()).mapToDouble(Rating::getRating).average();

        if (avgRating.isEmpty()) {
            return 5.0;
        }

        return avgRating.getAsDouble();
    }

    // Média de avaliação de um motorista
    @GetMapping("/avg/driver/{user_cpf}")
    public Double getDriverAverageRating(@PathVariable String user_cpf) {
        List<Rating> ratings = ratingRepository.findByUserTo(user_cpf);

        OptionalDouble avgRating = ratings.stream().filter(Rating::isDriverRating).mapToDouble(Rating::getRating).average();

        if (avgRating.isEmpty()) {
            return 5.0;
        }

        return avgRating.getAsDouble();
    }

    @PostMapping("/create")
    public ResponseEntity<Rating> createRating(@RequestBody CreateRatingDTO ratingDTO) {
        Rating rating = new Rating();
        rating.setUserFrom(ratingDTO.getUser_from());
        rating.setUserTo(ratingDTO.getUser_to());
        rating.setRating(ratingDTO.getRating());
        rating.setDescription(ratingDTO.getDescription());
        rating.setDriverRating(ratingDTO.getDriver_rating());
        ratingRepository.save(rating);
        return ResponseEntity.ok(rating);
    }
}
