package com.trabalho.EngSoft.Controller;

import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Model.Enums.RoleName;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Model.VerificationCode;
import com.trabalho.EngSoft.Repository.RoleRepository;
import com.trabalho.EngSoft.Repository.UserRepository;
import com.trabalho.EngSoft.Repository.VerificationCodesRepository;
import com.trabalho.EngSoft.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/verify")
@CrossOrigin(origins = "*")
public class VerificationController {
    @Autowired
    private VerificationCodesRepository verificationCodesRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    private final EmailService emailService;

    public VerificationController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/{code}")
    private ResponseEntity<?> verify(@PathVariable String code) {
        Optional<VerificationCode> verificationCode_opt = verificationCodesRepository.findByCode(code);

        if (verificationCode_opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        VerificationCode verificationCode = verificationCode_opt.get();
        User user = verificationCode.getUser();

        Role passengerRole = roleRepository.findByRole(RoleName.PASSENGER)
                .orElseThrow(() -> new RuntimeException("Role PASSENGER not found"));
        Role notVerifiedRole = roleRepository.findByRole(RoleName.NOT_VERIFIED_USER)
                .orElseThrow(() -> new RuntimeException("Role NOT_VERIFIED_USER not found"));

        Set<Role> userRoles = user.getRoles();
        userRoles.remove(notVerifiedRole);
        userRoles.add(passengerRole);
        user.setRoles(userRoles);

        userRepository.save(user);
        verificationCodesRepository.delete(verificationCode);

        return ResponseEntity.ok("Usuario verificado com sucesso");
    }

    @PostMapping("/resend/{email}")
    private ResponseEntity<?> verifyResend(@PathVariable String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User to send resend email not found"));

        VerificationCode code = verificationCodesRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Verification code not found"));

        if (emailService.SendVerificationCode(email, code.getCode())) {
            return ResponseEntity.ok("Email enviado com sucesso");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
