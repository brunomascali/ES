package com.trabalho.EngSoft.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.trabalho.EngSoft.Model.Ride;
import com.trabalho.EngSoft.Model.User;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long>{
    List<Ride> findByDriver(User driver);
    List<Ride> findByDriverAndRideComplete(User driver, boolean rideComplete);
    List<Ride> findByRideComplete(boolean rideComplete);
}
