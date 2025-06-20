package com.trabalho.EngSoft.Initializer;

import com.trabalho.EngSoft.Model.Ride;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Repository.RideRepository;
import com.trabalho.EngSoft.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
@Order(3)
public class RideInitializer implements CommandLineRunner {
    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if (rideRepository.count() == 0) {
            User u1 = userRepository.findByCpf("11111111111").get();
            Ride ride = new Ride();
            ride.setDriver(u1);
            ride.setStartAddress("Avenida do Forte 1500 Porto Alegre RS");
            ride.setLatitude(-30.0273181);
            ride.setLongitude(-51.1507413);
            ride.setDate(LocalDate.of(2025, 6, 30));
            ride.setArrivalTime(LocalTime.of(10, 30));
            ride.setPaymentComplete(false);
            ride.setRideComplete(false);
            ride.setAvailableSeats(3);
            ride.setPrice(4.50f);
            ride.setDescription("Rota A -> B -> C...");
            rideRepository.save(ride);
        }
    }
}
