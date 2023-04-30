package com.uva.API_Reservas.Controller;


import com.uva.API_Reservas.Exception.ReservaException;
import com.uva.API_Reservas.Model.Details;
import com.uva.API_Reservas.Model.Reserva;
import com.uva.API_Reservas.Model.Rol;
import com.uva.API_Reservas.Model.Status;
import com.uva.API_Reservas.Repository.ReservaRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("book")
@CrossOrigin(origins = "*")
public class ReservaController {

    private final ReservaRepository repository;

    private final Details details;

    public ReservaController(ReservaRepository repository){
        this.repository = repository;
        details = new Details();
        System.out.println("Precio/dia" + details.getPrecio_dia() + " Habitaciones: " + details.getNumHabitaciones());
    }

    @GetMapping("/availability")
    public List<LocalDate> getDisponibilidad(@RequestParam String fechaDesde, @RequestParam String fechaHasta){
        try{
            LocalDate fechaD = LocalDate.parse(fechaDesde);
            LocalDate fechaH = LocalDate.parse(fechaHasta);
            if(fechaD.isAfter(LocalDate.now()) && fechaH.isAfter(fechaD)) {
                List<LocalDate> listFechas = fechaD.datesUntil(fechaH.plusDays(1)).collect(Collectors.toList());
                HashMap<LocalDate,Integer> habitacionesFecha = getAvailability(fechaD,fechaH);

                for(LocalDate fecha: habitacionesFecha.keySet().stream().collect(Collectors.toList())){
                    if(habitacionesFecha.get(fecha) >= details.getNumHabitaciones()){
                        listFechas.remove(fecha);
                    }
                }
                return listFechas;
            }else {
                throw new ReservaException("Fechas incorrectas");
            }
        }catch (Exception e){
            throw new ReservaException("Error al obtener las fechas: " + e);
        }
    }
    @GetMapping()
    public List<Reserva> getReservas(@RequestParam(required = false) String guestEmail){
        try{
            List<Reserva> reservas = new ArrayList<>();
            List<Reserva> reservasTotales;
            Reserva newReserva = new Reserva();
            if (guestEmail == null) {
                reservasTotales = repository.findAll().stream().toList();
            }else{
                reservasTotales = repository.findByGuestEmail(guestEmail);
            }
            for(Reserva reserva : reservasTotales) {
                newReserva.setId(reserva.getId());
                newReserva.setPrice(reserva.getPrice());
                newReserva.setUnits(reserva.getUnits());
                newReserva.setGuestEmail(reserva.getGuestEmail());
                newReserva.setNumGuest(reserva.getNumGuest());
                newReserva.setStatus(reserva.getStatus());
                newReserva.setDateIn(reserva.getDateIn());
                newReserva.setDateOut(reserva.getDateOut());
                newReserva.setCreated_at(reserva.getCreated_at());
                if(guestEmail == null)
                    newReserva.setGuestName(reserva.getGuestName());
                reservas.add(newReserva);
            }
            Collections.sort(reservas, new Comparator<Reserva>() {
                public int compare(Reserva o1, Reserva o2) {
                    if (o1.getDateIn() == null || o2.getDateIn() == null)
                        return 0;
                    return o1.getDateIn().compareTo(o2.getDateIn());
                }
            });
            return reservas;
        }catch (Exception e){
            throw new ReservaException("Error al obtener las reservas: " + e);
        }
    }

    @GetMapping("/{id}")
    public Reserva getReserva(@PathVariable String id){
        try{
            Reserva reserva = repository.findById(Integer.parseInt(id)).orElseThrow(()-> new ReservaException("No existe la reserva"));
            return reserva;
        }catch (Exception e){
            throw new ReservaException("Error al obtener la reserva: " + e);
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public String postReserva(@RequestBody Reserva reserva){
        try{
            LocalDate fechaDesde = reserva.getDateIn();
            LocalDate fechaHasta = reserva.getDateOut();
            if(reserva.getNumGuest()<=3*reserva.getUnits() && reserva.getUnits() <= details.getNumHabitaciones() && fechaDesde.isAfter(LocalDate.now())
                    && fechaHasta.isAfter(fechaDesde)){
                HashMap<LocalDate,Integer> habitacionesFecha = getAvailability(fechaDesde,fechaHasta);
                for(LocalDate fecha : habitacionesFecha.keySet().stream().collect(Collectors.toList())){
                    if(habitacionesFecha.get(fecha)+reserva.getUnits() > details.getNumHabitaciones())
                        throw new ReservaException("No hay suficientes habitaciones para el dia " + fecha.toString());
                }
                Reserva newReserva = new Reserva(reserva.getGuestName(),reserva.getGuestEmail(),reserva.getUnits(),reserva.getNumGuest(),reserva.getDateIn(),reserva.getDateOut());
                repository.save(newReserva);
                return "Nueva reserva creada";
            }else{
                throw new ReservaException("Error en los parametros de la reserva");
            }
        }catch (Exception e){
            throw new ReservaException("Error al crear la reserva: " + e);
        }
    }

    private HashMap<LocalDate,Integer> getAvailability(LocalDate fechaDesde, LocalDate fechaHasta){
        List<LocalDate> listFechas = fechaDesde.datesUntil(fechaHasta.plusDays(1)).collect(Collectors.toList());
        List<Reserva> reservas = repository.findAll();
        HashMap<LocalDate,Integer> habitacionesFecha = new HashMap<>();
        for(Reserva reserva: reservas){
            if(!reserva.getStatus().equals(Status.Cancelled)) {
                List<LocalDate> fechasReserva = reserva.getDateIn().datesUntil(reserva.getDateOut().plusDays(1)).collect(Collectors.toList());
                if(!Collections.disjoint(listFechas, fechasReserva)){
                    for (LocalDate fecha : fechasReserva) {
                        if(listFechas.contains(fecha) ) {
                            if (!habitacionesFecha.containsKey(fecha)) {
                                habitacionesFecha.put(fecha, reserva.getUnits());
                            } else {
                                habitacionesFecha.put(fecha, habitacionesFecha.get(fecha) + reserva.getUnits());
                            }
                        }
                    }
                }
            }
        }
        return habitacionesFecha;
    }

    @PutMapping(value={"/{id}"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String modificarReserva(@PathVariable String id, @RequestBody Reserva newReserva){
        try{

            Reserva reserva = repository.findById(Integer.parseInt(id)).orElseThrow(() -> new ReservaException("No existe la reserva."));
            reserva.setGuestName(newReserva.getGuestName());
            reserva.setStatus(newReserva.getStatus());
            reserva.setUpdated_at(LocalDate.now());
            repository.save(reserva);
            return "Reserva actualizada";
        }catch (Exception e){
            throw new ReservaException("Error al modificar la reserva: " + e);
        }
    }

}
