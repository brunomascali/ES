package com.trabalho.EngSoft.Controller;

import java.util.List;
import java.util.Optional;

import com.trabalho.EngSoft.DTO.CreateComplaintDTO;
import com.trabalho.EngSoft.Model.Complaint;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Repository.RideRepository;
import com.trabalho.EngSoft.Repository.RideRequestRepository;
import com.trabalho.EngSoft.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.trabalho.EngSoft.Repository.ComplaintRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RideRequestRepository rideRequestRepository;

    @Autowired
    private RideRepository rideRepository;

    @GetMapping("")
    public List<Complaint> getComplaints() {
        return complaintRepository.findAll();
    }

    @PostMapping("/create")
    public ResponseEntity<Complaint> createComplaint(@RequestBody CreateComplaintDTO complaintDTO) {
        // Cria a denuncia
        Complaint complaint = new Complaint();
        complaint.setUser_from(complaintDTO.getUser_from());
        complaint.setUser_to(complaintDTO.getUser_to());
        complaint.setDescription(complaintDTO.getDescription());
        complaint.setStatus("open");
        complaintRepository.save(complaint);

        return ResponseEntity.ok(complaint);
    }

    @PostMapping("/ban/{complaint_id}")
    public ResponseEntity<?> banUser(@PathVariable long complaint_id) {
        Optional<Complaint> complaint_opt = complaintRepository.findById(complaint_id);
        if (complaint_opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Complaint complaint = complaint_opt.get();
        complaint.setStatus("banned");
        complaintRepository.save(complaint);

        Optional<User> user_opt = userRepository.findByCpf(complaint.getUser_to());
        if (user_opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = user_opt.get();
        user.setBanned(true);
        userRepository.save(user);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/close/{complaint_id}")
    public ResponseEntity<Complaint> closeComplaint(@PathVariable long complaint_id) {
        Optional<Complaint> complaint_opt = complaintRepository.findById(complaint_id);
        if (complaint_opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Complaint complaint = complaint_opt.get();
        complaint.setStatus("notbanned");
        complaintRepository.save(complaint);
        return ResponseEntity.ok(complaint);
    }
}