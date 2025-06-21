package com.trabalho.EngSoft.Controller;

import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trabalho.EngSoft.DTO.DriverValidationDTO;
import com.trabalho.EngSoft.Model.CNH;
import com.trabalho.EngSoft.Model.CRLV;
import com.trabalho.EngSoft.Model.DriverInfo;
import com.trabalho.EngSoft.Model.Enums.RoleName;
import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Repository.CNHRepository;
import com.trabalho.EngSoft.Repository.CRLVRepository;
import com.trabalho.EngSoft.Repository.DriverInfoRepository;
import com.trabalho.EngSoft.Repository.RoleRepository;
import com.trabalho.EngSoft.Repository.UserRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/driver")
public class DriverController {
    @Autowired
    CNHRepository cnhRepository;

    @Autowired
    CRLVRepository CRLVRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DriverInfoRepository driverInfoRepository;

    @PostMapping("/validate")
    public ResponseEntity<?> validateDriver(@RequestBody DriverValidationDTO driverValidationDTO) {
        Optional<CNH> cnh_opt = cnhRepository.findByCpf(driverValidationDTO.getCpf());
        Optional<CRLV> crlv_opt = CRLVRepository.findByPlate(driverValidationDTO.getPlate());

        if (cnh_opt.isPresent() && crlv_opt.isPresent()) {
            CNH cnh = cnh_opt.get();
            CRLV crlv = crlv_opt.get();

            if (
                    Objects.equals(cnh.getCpf(), driverValidationDTO.getCpf()) &&
                    Objects.equals(crlv.getPlate(), driverValidationDTO.getPlate())
            ) {
                Role driverRole = roleRepository.findByRole(RoleName.DRIVER)
                        .orElseThrow(() -> new RuntimeException("Passenger DRIVER not found"));
                User user = userRepository.findByCpf(driverValidationDTO.getCpf()).get();

                user.getRoles().add(driverRole);
                userRepository.save(user);

                DriverInfo driverInfo = new DriverInfo();
                driverInfo.setDriver(user);
                driverInfo.setPlate(driverValidationDTO.getPlate());
                driverInfo.setColor(driverValidationDTO.getColor());
                driverInfo.setModel(driverValidationDTO.getModel());
                driverInfoRepository.save(driverInfo);

                return ResponseEntity.ok().build();
            }
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDriverInfo(@PathVariable Long id) {
        Optional<DriverInfo> driverInfo_opt = driverInfoRepository.findByDriverId(id);

        if (driverInfo_opt.isPresent()) {
            return ResponseEntity.ok().body(driverInfo_opt.get());
        }

        return ResponseEntity.notFound().build();
    }
}
