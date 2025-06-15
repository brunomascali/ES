package com.trabalho.EngSoft.Controller;

import com.trabalho.EngSoft.DTO.SignupRequestDTO;
import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Model.Enums.RoleName;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Model.VerificationCode;
import com.trabalho.EngSoft.Repository.UserRepository;
import com.trabalho.EngSoft.Repository.VerificationCodesRepository;

import com.trabalho.EngSoft.Service.EmailService;
import com.trabalho.EngSoft.Service.VerificationCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationCodesRepository verificationCodesRepository;

    private final EmailService emailService;

    public UserController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getUserById(@PathVariable long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserById(@PathVariable String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        }
    }

    @PutMapping("/{email}")
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



    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody SignupRequestDTO signupRequest) {
        // A verificação da checagem de email já está implementada na função de verificação
        // ela pode ser excluída do signUp, assim que a verificação for implementada no frontend
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            return ResponseEntity.status(401).body("Email já cadastrado");
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.ENGLISH);
        LocalDate dob = LocalDate.parse(signupRequest.getDateOfBirth(), formatter);
        Role role = new Role(1, RoleName.NOT_VERIFIED_USER);

        // Cria o usuário no banco de dados
        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(signupRequest.getPassword());
        user.setDateOfBirth(dob);
        user.setRoles(Set.of(role));
        user.setCpf(signupRequest.getCpf());
        userRepository.save(user);

        // Cria um código de verificação e salva no banco de dados
        String code = VerificationCodeGenerator.generateCode();
        VerificationCode verification_code = new VerificationCode();
        verification_code.setCode(code);
        verification_code.setUser(user);
        verificationCodesRepository.save(verification_code);

        emailService.SendVerificationCode(user.getEmail(), code);

        return ResponseEntity.ok().build();
    }
}
