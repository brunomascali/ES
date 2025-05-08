package com.trabalho.EngSoft.Controller;

import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("")
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
