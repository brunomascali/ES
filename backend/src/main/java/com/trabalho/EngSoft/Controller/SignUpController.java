package com.trabalho.EngSoft.Controller;

import com.trabalho.EngSoft.DTO.SignupRequest;
import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/signup")
public class SignUpController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("")
    public ResponseEntity<?> signUp(@RequestBody SignupRequest signupRequest) {
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            return ResponseEntity.status(401).body("Email já cadastrado");
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.ENGLISH);
        LocalDate dob = LocalDate.parse(signupRequest.getDateOfBirth(), formatter);

        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(signupRequest.getPassword());
        user.setDateOfBirth(dob);
        user.setRoles(Set.of(new Role(2, "USUARIO")));
        userRepository.save(user);

        return ResponseEntity.ok().build();
    }
}
