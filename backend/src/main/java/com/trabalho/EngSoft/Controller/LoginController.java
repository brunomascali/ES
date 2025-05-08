package com.trabalho.EngSoft.Controller;

import com.trabalho.EngSoft.DTO.LoginRequest;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());

        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(user.get());
        }

        return ResponseEntity.status(401).body("Email ou senha incorreta");
    }
}
