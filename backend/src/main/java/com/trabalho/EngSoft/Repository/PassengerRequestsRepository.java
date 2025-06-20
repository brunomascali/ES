package com.trabalho.EngSoft.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.trabalho.EngSoft.Model.PassengerRequest;
import com.trabalho.EngSoft.Model.Ride;
import com.trabalho.EngSoft.Model.User;

@Repository
public interface PassengerRequestsRepository extends JpaRepository<PassengerRequest, Long> {
    List<PassengerRequest> findByRide(Ride ride);
    Optional<PassengerRequest> findByRideAndPassenger(Ride ride, User passenger);
}
