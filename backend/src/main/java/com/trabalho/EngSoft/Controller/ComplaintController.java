package com.trabalho.EngSoft.Controller;

import java.util.List;
import java.util.Optional;

import com.trabalho.EngSoft.DTO.CreateComplaintDTO;
import com.trabalho.EngSoft.Model.Complaint;
import com.trabalho.EngSoft.Model.User;
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

    @GetMapping("")
    public List<Complaint> getComplaints() {
        return complaintRepository.findAll();
    }

    @PostMapping("/create")
    public ResponseEntity<Complaint> createComplaint(@RequestBody CreateComplaintDTO complaintDTO) {
        Complaint complaint = new Complaint();
        complaint.setUser_id_from(complaintDTO.getUser_id_from());
        complaint.setUser_id_to(complaintDTO.getUser_id_to());
        complaint.setDescription(complaintDTO.getDescription());
        complaint.setStatus("open");
        complaintRepository.save(complaint);
        return ResponseEntity.ok(complaint);
    }

    @PutMapping("/close")
    public ResponseEntity<Complaint> closeComplaint(@RequestBody Complaint complaint) {
        complaint.setStatus("notbanned");
        complaintRepository.save(complaint);
        return ResponseEntity.ok(complaint);
    }
}