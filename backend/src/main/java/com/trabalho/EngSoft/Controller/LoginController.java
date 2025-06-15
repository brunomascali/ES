package com.trabalho.EngSoft.Controller;

import com.trabalho.EngSoft.DTO.LoginRequestDTO;
import com.trabalho.EngSoft.DTO.UserDTO;
import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/login")
public class LoginController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());

        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
            Set<String> roles = user.get().getRoles().stream().map(
                    (Role role) -> role.getRole().toString()
            ).collect(Collectors.toSet());

            UserDTO loginResponse = new UserDTO(
                    user.get().getName(),
                    user.get().getEmail(),
                    user.get().getCpf(),
                    roles
            );
            return ResponseEntity.ok(loginResponse);
        }

        return ResponseEntity.status(401).body("Email ou senha incorreta");
    }
}
