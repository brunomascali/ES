package com.trabalho.EngSoft.Controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

import com.trabalho.EngSoft.DTO.PassengerDTO;
import com.trabalho.EngSoft.Model.*;
import com.trabalho.EngSoft.Repository.RatingRepository;
import com.trabalho.EngSoft.Repository.RideRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.trabalho.EngSoft.DTO.RideRequestDTO;
import com.trabalho.EngSoft.DTO.CreateRideDTO;
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

    @Autowired
    private RideRequestRepository rideRequestRepository;

    @Autowired
    private RatingRepository rideRatingRepository;

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
        newRide.setDays(createRequest.getDays());
        
        try {
            LocalTime rideTime = LocalTime.parse(createRequest.getArrivalTime());
            
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

    // Cria uma Requisição de carona
    @PostMapping("/requestRide")
    public ResponseEntity<?> requestRide(@RequestBody RideRequestDTO rideRequestDTO){
        Optional<Ride> rideToAccept = rideRepository.findById(rideRequestDTO.getRideId());
        Optional<User> userToAccept = userRepository.findByCpf(rideRequestDTO.getUserCPF());

        if (rideToAccept.isEmpty())
            return ResponseEntity.badRequest().body("Carona inexistente");
        if (userToAccept.isEmpty())
            return ResponseEntity.badRequest().body("Usuário inexistente");

        Ride ride = rideToAccept.get();

        if(ride.isUserInRide(userToAccept.get()))
            return ResponseEntity.badRequest().body("Usuário já está presente na carona");

        // Checa se a carona já foi concluída ou se já está lotada
//        if (!ride.active())
//            return ResponseEntity.badRequest().body("Carona já foi concluída");

        if (ride.full())
            return ResponseEntity.badRequest().body("Carona lotada");

        List<RideRequest> requests = rideRequestRepository.findByRideId(rideRequestDTO.getRideId());
        if (requests.stream().anyMatch(request -> Objects.equals(request.getUserCPF(), rideRequestDTO.getUserCPF()))) {
            return ResponseEntity.badRequest().body("Usuário já solicitou carona");
        }

        RideRequest request = new RideRequest();
        request.setRideId(rideRequestDTO.getRideId());
        request.setUserAddress(rideRequestDTO.getUserAddress());
        request.setUserName(userToAccept.get().getName());
        request.setUserCPF(rideRequestDTO.getUserCPF());
        request.setAccepted(false);
        request.setPaid(false);

        rideRequestRepository.save(request);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/acceptPassenger")
    public ResponseEntity<?> acceptPassenger(@RequestBody RideRequestDTO rideRequestDTO) {
        Optional<User> userToAccept = userRepository.findByCpf(rideRequestDTO.getUserCPF());
        Optional<Ride> rideToAccept = rideRepository.findById(rideRequestDTO.getRideId());

        if (rideToAccept.isEmpty())
            return ResponseEntity.badRequest().body("Carona inexistente");
        if (userToAccept.isEmpty())
            return ResponseEntity.badRequest().body("Usuário inexistente");

        Ride ride = rideToAccept.get();

        // Checa se a carona já foi concluída ou se já está lotada
//        if (!ride.active())
//            return ResponseEntity.badRequest().body("Carona já foi concluída");

        if (ride.full())
            return ResponseEntity.badRequest().body("Carona lotada");

        Passenger passenger = new Passenger();
        passenger.setAddress(rideRequestDTO.getUserAddress());
        passenger.setPassenger(userToAccept.get());

        ride.getPassengers().add(passenger);
        ride.setAvailableSeats(ride.getAvailableSeats() - 1);
        rideRepository.save(ride);

        List<RideRequest> rideRequests = rideRequestRepository.findByRideId(ride.getId());
        for (RideRequest rideRequest1 : rideRequests) {
            if (Objects.equals(rideRequest1.getUserCPF(), rideRequestDTO.getUserCPF())) {
                rideRequest1.setAccepted(true);
                rideRequestRepository.save(rideRequest1);
                break;
            }
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/rejectPassenger")
    public ResponseEntity<?> rejectPassenger(@RequestBody RideRequestDTO rideRequestDTO) {
        Optional<User> userToAccept = userRepository.findByCpf(rideRequestDTO.getUserCPF());
        Optional<Ride> rideToAccept = rideRepository.findById(rideRequestDTO.getRideId());

        if (rideToAccept.isEmpty())
            return ResponseEntity.badRequest().body("Carona inexistente");
        if (userToAccept.isEmpty())
            return ResponseEntity.badRequest().body("Usuário inexistente");

        Ride ride = rideToAccept.get();

        // Checa se a carona já foi concluída ou se já está lotada
//        if (!ride.active())
//            return ResponseEntity.badRequest().body("Carona já foi concluída");

        if (ride.full())
            return ResponseEntity.badRequest().body("Carona lotada");

        List<RideRequest> rideRequests = rideRequestRepository.findByRideId(ride.getId());
        for (RideRequest rideRequest1 : rideRequests) {
            if (Objects.equals(rideRequest1.getUserCPF(), rideRequestDTO.getUserCPF())) {
                rideRequestRepository.delete(rideRequest1);
                break;
            }
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/passengers/{ride_id}")
    public ResponseEntity<?> getRidePassengers(@PathVariable long ride_id) {
        List<PassengerDTO> passengers = rideRequestRepository.findByRideId(ride_id)
                .stream()
                .filter(rideRequest -> rideRequest.getRideId() == ride_id)
                .filter(RideRequest::isAccepted)
                .map(
                        rideRequest -> {
                            User user = userRepository.findByCpf(rideRequest.getUserCPF()).get();
                            double rating = rideRatingRepository.findByUserTo(rideRequest.getUserCPF())
                                    .stream()
                                    .mapToInt(Rating::getRating)
                                    .summaryStatistics().getAverage();

                            PassengerDTO passenger = new PassengerDTO();
                            passenger.setAddress(rideRequest.getUserAddress());
                            passenger.setPassengerName(user.getName());
                            passenger.setRating(rating == 0 ? 5.0 : rating);
                            passenger.setPassengerCPF(rideRequest.getUserCPF());

                            return passenger;
                        }
                )
                .toList();
//        Optional<Ride> ride_opt = rideRepository.findById(ride_id);
//
//        if (ride_opt.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }

        return ResponseEntity.ok().body(passengers);
    }

    @GetMapping("/requests/{ride_id}")
    public ResponseEntity<?> getRequestsByRide(@PathVariable long ride_id) {
        if (rideRepository.findById(ride_id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<RideRequest> requests = rideRequestRepository.findByRideId(ride_id);

        return ResponseEntity.ok().body(requests);
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
    @PutMapping("/confirmPayment/{rideID}/{passengerCPF}")
    ResponseEntity<?> confirmPayment(@PathVariable Long rideID, @PathVariable String passengerCPF) {
        rideRequestRepository.findByRideId(rideID)
                .stream()
                .filter(
                        rideRequest -> Objects.equals(rideRequest.getUserCPF(), passengerCPF)
                ).peek(
                        rideRequest -> rideRequest.setPaid(true)
                )
                .forEach(
                        rideRequest -> rideRequestRepository.save(rideRequest)
                );

        return ResponseEntity.ok().build();

//        Optional<User> rideDriver = userRepository.findByCpf(driverCPF);
//        Optional<Ride> rideToConfirm = rideRepository.findById(rideID);
//
//        if (rideDriver.isEmpty())
//            return ResponseEntity.status(401).body("Motorista não encontrado");
//        if (rideToConfirm.isEmpty())
//            return ResponseEntity.status(401).body("Carona inexistente");
//
//        User driver = rideDriver.get();
//        Ride ride = rideToConfirm.get();
//
//        if (!ride.getDriver().equals(driver))
//            return ResponseEntity.badRequest().body("Motorista inválido");
//
//        ride.setRideComplete(true);
//        ride.setPaymentComplete(true);
//        rideRepository.save(ride);
//
//        return ResponseEntity.ok().build();
    }    
}
