package com.uva.API_Reservas.Repository;

import com.uva.API_Reservas.Model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva,Integer> {
    List<Reserva> findByGuestEmail(String guestEmail);
}
