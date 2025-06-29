package com.trabalho.EngSoft.Controller;

import com.trabalho.EngSoft.DTO.validateCNHDTO;
import com.trabalho.EngSoft.Model.CNH;
import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Model.Enums.RoleName;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Repository.CNHRepository;
import com.trabalho.EngSoft.Repository.RoleRepository;
import com.trabalho.EngSoft.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/cnh")
public class CNHController {

    @Autowired
    private CNHRepository cnhRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("")
    public List<CNH> getAllCNH() {
        return cnhRepository.findAll();
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateCNH(@RequestBody validateCNHDTO validateCNHRequest) {
        Optional<CNH> cnh = cnhRepository.findByCpf(validateCNHRequest.getCpf());

        if (cnh.isPresent() && Objects.equals(cnh.get().getCnh(), validateCNHRequest.getCnh())) {
            Optional<User> user = userRepository.findByCpf(validateCNHRequest.getCpf());
            Role driverRole = roleRepository.findByRole(RoleName.DRIVER)
                    .orElseThrow(() -> new RuntimeException("Passenger DRIVER not found"));
            if (user.isPresent()) {
                user.get().getRoles().add(driverRole);
                userRepository.save(user.get());
                return ResponseEntity.ok().build();
            }
        }

        return ResponseEntity.notFound().build();
    }
}
