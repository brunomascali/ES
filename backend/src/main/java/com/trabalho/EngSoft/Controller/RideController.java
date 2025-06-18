package com.trabalho.EngSoft.Controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trabalho.EngSoft.DTO.AcceptRideDTO;
import com.trabalho.EngSoft.DTO.CreateRideDTO;
import com.trabalho.EngSoft.Model.Passenger;
import com.trabalho.EngSoft.Model.Ride;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Repository.RideRepository;
import com.trabalho.EngSoft.Repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/rides")
public class RideController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RideRepository rideRepository;

    // Lista todas as caronas para teste
    @GetMapping("")
    public List<Ride> getAllRides(){
        return rideRepository.findAll();
    }

    // Retorna todas as caronas que ainda estão ativas
    @GetMapping("/activeRides")
    public List<Ride> getDriverRides(){
        return rideRepository.findByRideComplete(false); 
    }

    // Pega todas as caronas de um motorista
    @GetMapping("/driver/{cpf}")
    public ResponseEntity<?> getDriverRides(@PathVariable String cpf){
        Optional<User> driver = userRepository.findByCpf(cpf);

        if (driver.isEmpty())
            return ResponseEntity.notFound().build();
        
        return ResponseEntity.ok().body(rideRepository.findByDriver(driver.get()));
    }

    // Cria uma carona a partir do CPF do motorista
    @PostMapping("/create")
    public ResponseEntity<?> createRide(@RequestBody CreateRideDTO createRequest){
        Optional<User> user = userRepository.findByCpf(createRequest.getDriverCPF());

        if (user.isEmpty())
            return ResponseEntity.badRequest().body("CPF inválido");

        User driver = user.get();
    
        // Checa se o motorista possui uma carona ainda ativa
        if (!rideRepository.findByDriverAndRideComplete(driver, false).isEmpty())
            return ResponseEntity.badRequest().body("Motorista possui uma carona ativa"); 
        
        Ride newRide = new Ride();

        newRide.setDriver(driver);
        newRide.setAvailableSeats(createRequest.getAvailableSeats());
        newRide.setStartAddress(createRequest.getStartingAddress());
        newRide.setLatitude(createRequest.getLatitude());
        newRide.setLongitude(createRequest.getLongitude());
        
        try {
            LocalDate rideDate = LocalDate.parse(createRequest.getDate());
            LocalTime rideTime = LocalTime.parse(createRequest.getArrivalTime());
            
            newRide.setDate(rideDate);
            newRide.setArrivalTime(rideTime);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Formato de data ou hora inválido");
        }
        
        newRide.setDescription(createRequest.getDescription());
        newRide.setPrice(createRequest.getPrice());

        rideRepository.save(newRide);

        return ResponseEntity.ok().body(newRide);
    }

    // Deleta uma carona por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRideById(@PathVariable Long id){
        if (rideRepository.findById(id).isEmpty())
            return ResponseEntity.notFound().build();

        rideRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Requisição de aceitar uma carona por usuário
    @PutMapping("/acceptRide")
    public ResponseEntity<?> acceptRide(@RequestBody AcceptRideDTO acceptRequest){
        Optional<Ride> rideToAccept = rideRepository.findById(acceptRequest.getRideID());
        Optional<User> userToAccept = userRepository.findByCpf(acceptRequest.getUserCPF());

        if (rideToAccept.isEmpty())
            return ResponseEntity.badRequest().body("Carona inexistente");
        if (userToAccept.isEmpty())
            return ResponseEntity.badRequest().body("Usuário inexistente");

        Ride ride = rideToAccept.get();
        Passenger passenger = new Passenger(userToAccept.get(), acceptRequest.getUserAddress());

        if(ride.isUserInRide(passenger.getPassenger()))
            return ResponseEntity.badRequest().body("Usuário já está presente na carona");

        // Checa se a carona já foi concluída ou se já está lotada
        if (!ride.active())
            return ResponseEntity.badRequest().body("Carona já foi concluída");

        if (ride.full())
            return ResponseEntity.badRequest().body("Carona lotada");

        Set<Passenger> ridePassengers = ride.getPassengers();
        ridePassengers.add(passenger);

        ride.setPassengers(ridePassengers);
        ride.decreaseAvailableSeats();
        rideRepository.save(ride);

        return ResponseEntity.ok().build();
    }

    // Confirma que a carona foi concluída
    @PutMapping("/completeRide/{rideID}/{driverCPF}")
    ResponseEntity<?> completeRide(@PathVariable Long rideID, @PathVariable String driverCPF){
        Optional<User> driver = userRepository.findByCpf(driverCPF);
        Optional<Ride> ride = rideRepository.findById(rideID);

        if (driver.isEmpty())
            return ResponseEntity.badRequest().body("Usuário inexistente");
        if (ride.isEmpty())
            return ResponseEntity.badRequest().body("Carona inexistente");

        if (!ride.get().getDriver().equals(driver.get()))
            return ResponseEntity.badRequest().body("Motorista inválido");
        
        ride.get().setRideComplete(true);
        rideRepository.save(ride.get());

        return ResponseEntity.ok().build();
    }

    // Confirma que foi efetuado o pagamento da carona
    @PutMapping("/confirmPayment/{rideID}/{driverCPF}")
    ResponseEntity<?> confirmPayment(@PathVariable Long rideID, @PathVariable String driverCPF){
        Optional<User> rideDriver = userRepository.findByCpf(driverCPF);
        Optional<Ride> rideToConfirm = rideRepository.findById(rideID);

        if (rideDriver.isEmpty())
            return ResponseEntity.status(401).body("Motorista não encontrado");
        if (rideToConfirm.isEmpty())
            return ResponseEntity.status(401).body("Carona inexistente");

        User driver = rideDriver.get();
        Ride ride = rideToConfirm.get();

        if (!ride.getDriver().equals(driver))
            return ResponseEntity.badRequest().body("Motorista inválido");

        ride.setRideComplete(true);
        ride.setPaymentComplete(true);
        rideRepository.save(ride);

        return ResponseEntity.ok().build();
    }    
}
