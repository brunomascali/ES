package com.trabalho.EngSoft.Controller;

import com.trabalho.EngSoft.DTO.validateCNHRequest;
import com.trabalho.EngSoft.Model.CNH;
import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Repository.CNHRepository;
import com.trabalho.EngSoft.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/cnh")
public class CNHController {

    @Autowired
    private CNHRepository cnhRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public List<CNH> getAllCNH() {
        return cnhRepository.findAll();
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateCNH(@RequestBody validateCNHRequest validateCNHRequest) {
        Optional<CNH> cnh = cnhRepository.findByCpf(validateCNHRequest.getCpf());

        if (cnh.isPresent() && Objects.equals(cnh.get().getCnh(), validateCNHRequest.getCnh())) {
            Optional<User> user = userRepository.findByCpf(validateCNHRequest.getCpf());
            if (user.isPresent()) {
                user.get().getRoles().add(new Role(4, "MOTORISTA"));
                userRepository.save(user.get());
                return ResponseEntity.ok().build();
            }
        }

        return ResponseEntity.notFound().build();
    }
}
