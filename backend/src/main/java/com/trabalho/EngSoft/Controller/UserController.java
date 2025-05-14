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
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable long id) {
        return userRepository.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        }
    }

    @PostMapping("/create")
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
        user.setCpf(signupRequest.getCpf());
        userRepository.save(user);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable long id, @RequestBody User user) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User userToUpdate = userOptional.get();
            userToUpdate.setName(user.getName());
            userToUpdate.setEmail(user.getEmail());
            userRepository.save(userToUpdate);
            return ResponseEntity.ok(userToUpdate);
        }

        return ResponseEntity.notFound().build();
    }
}
