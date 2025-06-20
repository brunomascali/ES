package com.trabalho.EngSoft.Controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.trabalho.EngSoft.DTO.AcceptRideDTO;
import com.trabalho.EngSoft.DTO.CreateRideDTO;
import com.trabalho.EngSoft.Model.Passenger;
import com.trabalho.EngSoft.Model.Ride;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Model.PassengerRequest;
import com.trabalho.EngSoft.Repository.RideRepository;
import com.trabalho.EngSoft.Repository.UserRepository;
import com.trabalho.EngSoft.Repository.PassengerRequestsRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/rides")
public class RideController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private PassengerRequestsRepository requestRepository;

    // Lista todas as caronas para teste
    @GetMapping("")
    public List<Ride> getAllRides(){
        return rideRepository.findAll();
    }

    // Retorna todas as caronas que ainda estão ativas
    @GetMapping("/activeRides")
    public List<Ride> getActiveRides(){
        return rideRepository.findByRideComplete(false); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRideById(@PathVariable long id) {
        Optional<Ride> ride_opt = rideRepository.findById(id);

        if (ride_opt.isPresent()) {
            return ResponseEntity.ok(ride_opt.get());
        }
        return ResponseEntity.notFound().build();
    }

    // Pega todas as caronas de um motorista
    @GetMapping("/driver/{cpf}")
    public ResponseEntity<?> getDriverRides(@PathVariable String cpf){
        Optional<User> driver = userRepository.findByCpf(cpf);

        if (driver.isEmpty())
            return ResponseEntity.notFound().build();
        
        return ResponseEntity.ok().body(rideRepository.findByDriver(driver.get()));
    }

    // Pega todas as requisições de passageiros a partir de uma carona
    @GetMapping("/rideRequests/{rideID}/{driverCPF}")
    public ResponseEntity<?> getRideRequests(@PathVariable long rideID, @PathVariable String driverCPF){
        Optional<User> driver = userRepository.findByCpf(driverCPF);
        Optional<Ride> ride = rideRepository.findById(rideID);

        if (driver.isEmpty())
            return ResponseEntity.badRequest().body("Motorista inexistente");
        if (ride.isEmpty())
            return ResponseEntity.badRequest().body("Carona inexistente");

        return ResponseEntity.ok().body(requestRepository.findByRide(ride.get()));
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
    @PutMapping("/acceptRideRequest")
    public ResponseEntity<?> acceptRideRequest(@RequestBody AcceptRideDTO acceptRequest){
        Optional<Ride> rideToAccept = rideRepository.findById(acceptRequest.getRideID());
        Optional<User> userToAccept = userRepository.findByCpf(acceptRequest.getUserCPF());

        if (rideToAccept.isEmpty())
            return ResponseEntity.badRequest().body("Carona inexistente");
        if (userToAccept.isEmpty())
            return ResponseEntity.badRequest().body("Usuário inexistente");

        Ride ride = rideToAccept.get();
        User passenger = userToAccept.get();

        if(ride.isUserInRide(passenger))
            return ResponseEntity.badRequest().body("Usuário já está presente na carona");

        // Checa se a carona já foi concluída ou se já está lotada
        if (!ride.active())
            return ResponseEntity.badRequest().body("Carona já foi concluída");

        if (ride.full())
            return ResponseEntity.badRequest().body("Carona lotada");

        // Cria nova requisição de aceitar carona
        PassengerRequest request = new PassengerRequest();

        request.setRide(ride);
        request.setPassenger(passenger);
        request.setAddress(acceptRequest.getUserAddress());

        requestRepository.save(request);

        return ResponseEntity.ok().build();
    }

    // Requisição de aceitar passageiro para carona por motorista
    @PutMapping("/confirmPassenger/{rideID}/{driverCPF}/{passengerCPF}")
    ResponseEntity<?> confirmPassenger(@PathVariable long rideID, @PathVariable String driverCPF, @PathVariable String passengerCPF){
        Optional<Ride> rideToConfirm = rideRepository.findById(rideID);
        Optional<User> passengerToConfirm = userRepository.findByCpf(passengerCPF);

        if (rideToConfirm.isEmpty())
            return ResponseEntity.badRequest().body("Carona inexistente");
        if (passengerToConfirm.isEmpty())
            return ResponseEntity.badRequest().body("Passageiro inexistente");
        
        Ride ride = rideToConfirm.get();
        User user = passengerToConfirm.get();

        if (!ride.getDriver().getCpf().equals(driverCPF))
            return ResponseEntity.badRequest().body("Motorista inválido");

        Optional<PassengerRequest> request = requestRepository.findByRideAndPassenger(ride, user);

        if (request.isEmpty())
            return ResponseEntity.badRequest().body("Requisição de passageiro inválido");
        if (!ride.active())
            return ResponseEntity.badRequest().body("Carona já foi concluída");
        if (ride.full())
            return ResponseEntity.badRequest().body("Carona lotada");

        // Confirma passageiro na carona
        Passenger passenger = new Passenger(user, request.get().getAddress());
        Set<Passenger> passengers = ride.getPassengers();

        passengers.add(passenger);
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
