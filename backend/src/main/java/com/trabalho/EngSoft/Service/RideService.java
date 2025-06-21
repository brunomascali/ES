package com.trabalho.EngSoft.Service;

import com.trabalho.EngSoft.DTO.RideHistoryItemDTO;
import com.trabalho.EngSoft.Model.Ride;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Model.Passenger; 
import com.trabalho.EngSoft.Repository.RideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors; 

@Service
public class RideService {

    @Autowired
    private RideRepository rideRepository;

    public List<RideHistoryItemDTO> getUserRideHistory(User user) {
        // método para buscar todas as caronas do usuário
        List<Ride> relevantRides = rideRepository.findByUserAsDriverOrPassengerAndRideComplete(user, true);

        List<RideHistoryItemDTO> history = new ArrayList<>();

        for (Ride ride : relevantRides) {
            RideHistoryItemDTO dto = new RideHistoryItemDTO();
            dto.setId(ride.getId());
            dto.setDays(ride.getDays());
            dto.setTime(ride.getArrivalTime());
            dto.setStartAddress(ride.getStartAddress());
            dto.setPrice(ride.getPrice());
            dto.setDriverName(ride.getDriver().getName()); 

            // Determinar o papel do usuário na carona e preencher campos específicos
            if (ride.getDriver().equals(user)) {
                dto.setUserRole("DRIVER");
                dto.setTotalPassengers(ride.getPassengers().size());
                // passengerPickupAddress fica null
            } else {
                // Usuário é passageiro
                dto.setUserRole("PASSENGER");
                // totalPassengers fica null

                // Encontra o endereço específico do passageiro atual para esta carona
                String passengerAddress = ride.getPassengers().stream()
                        .filter(p -> p.getPassenger().equals(user))
                        .findFirst()
                        .map(Passenger::getAddress) 
                        .orElse("N/A");
                dto.setPassengerPickupAddress(passengerAddress);
            }
            history.add(dto);
        }

        // Ordenar o histórico por data/hora 
//        history.sort((r1, r2) -> {
//            int dateComparison = r2.getDate().compareTo(r1.getDate());
//            if (dateComparison != 0) {
//                return dateComparison;
//            }
//            return r2.getTime().compareTo(r1.getTime());
//        });

        return history;
    }

   
}