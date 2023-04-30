package com.uva.API_Reservas.Model;

import org.springframework.stereotype.Component;

@Component
public class Details {

    private int numHabitaciones;

    private int precio_dia;

    public Details(){
        this.precio_dia = 40;
        this.numHabitaciones = 10;
    }

    public int getPrecio_dia() {
        return precio_dia;
    }

    public int getNumHabitaciones() {
        return numHabitaciones;
    }

}
