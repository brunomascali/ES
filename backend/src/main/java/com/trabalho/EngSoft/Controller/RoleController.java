package com.trabalho.EngSoft.Controller;

import com.trabalho.EngSoft.DTO.AlterRoleDTO;
import com.trabalho.EngSoft.DTO.UserDTO;
import com.trabalho.EngSoft.Model.Enums.RoleName;
import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Repository.RoleRepository;
import com.trabalho.EngSoft.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/role")
public class RoleController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @PutMapping("")
    public ResponseEntity<?> alterRole(@RequestBody AlterRoleDTO alterRoleDTO) {
        Optional<User> userOptional = userRepository.findByEmail(alterRoleDTO.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            Role passengerRole = roleRepository.findByRole(RoleName.PASSENGER)
                    .orElseThrow(() -> new RuntimeException("Passenger ROLE not found"));
            Role driverRole = roleRepository.findByRole(RoleName.DRIVER)
                    .orElseThrow(() -> new RuntimeException("Passenger DRIVER not found"));

            HashMap<String, Role> roleStrMapping = new HashMap<>();
            roleStrMapping.put("DRIVER", driverRole);
            roleStrMapping.put("PASSENGER", passengerRole);

            if (Objects.equals(alterRoleDTO.getAction(), "add") && roleStrMapping.containsKey(alterRoleDTO.getRole())) {
                Role role = roleStrMapping.get(alterRoleDTO.getRole());
                if (!user.getRoles().contains(role)) {
                    user.getRoles().add(role);
                    userRepository.save(user);
                }
            }

            else if (Objects.equals(alterRoleDTO.getAction(), "remove") && roleStrMapping.containsKey(alterRoleDTO.getRole())) {
                Role role = roleStrMapping.get(alterRoleDTO.getRole());
                if (user.getRoles().contains(role)) {
                    user.getRoles().remove(role);
                    userRepository.save(user);
                }
            }

            UserDTO userDTO = new UserDTO(
                    user.getName(),
                    user.getEmail(),
                    user.getCpf(),
                    user.getRoles().stream().map(
                            role -> role.getRole().toString()
                    ).collect(Collectors.toSet())
            );

            return ResponseEntity.ok(userDTO);
        }

        return ResponseEntity.notFound().build();
    }

}
