import { Component, OnInit } from '@angular/core';
import { Reserva, Usuario } from '../shared/app.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteApiRestService } from '../shared/cliente-api-rest.service';
import { DataService } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-reserva-crear',
  templateUrl: './reserva-crear.component.html',
  styleUrls: ['./reserva-crear.component.css']
})
export class ReservaCrearComponent implements OnInit {

  reservaVacia = {
    id: "",
    guestName: "",
    guestEmail: this.authService.getEmail,
    price: 1,
    units: 1,
    numGuest: 1,
    status: "Pending",
    dateIn: "",
    dateOut: "",
    created_at: "",
    updated_at: ""
  }
  reserva = this.reservaVacia as Reserva;
  hostRole:Boolean;
  FechasDisponibles!:String[];

  constructor(private ruta: ActivatedRoute, private router: Router, private clienteApiRest: ClienteApiRestService, private datos: DataService,public authService: AuthService) {
    this.hostRole = this.authService.isHost
  }

  ngOnInit(): void {
    console.log("En crear-reserva");
  }

  onSubmit() {
    console.log("Enviado formulario reservas");
      this.clienteApiRest.addReserva(this.reserva).subscribe(resp => {
        if (resp.status < 400) {
          this.datos.cambiarMostrarMensaje(true);
          this.datos.cambiarMensaje(resp.body);
          console.log("Reserva creada");
        } else {
          alert("No hay suficientes habitiones disponibles. Comprueba de nuevo la disponibilidad.")
          this.datos.cambiarMostrarMensaje(true);
          this.datos.cambiarMensaje("Error al añadir reserva");
        }
        if(this.isHost()){
          this.router.navigate(['/usuarios/reservas']);
        }else{
          this.router.navigate(['/usuarios/{{usuario.id}}/reservas']);
        }
      }, err => {
        alert("No hay suficientes habitaciones disponibles. Comprueba de nuevo la disponibilidad.")
        console.log("Error al crear: " + err.message);
        throw err;
      }
      )
  }

  setFechasDisponibles(fechaDesde:String,fechaHasta:String){
    this.clienteApiRest.getFechasDisponibles(fechaDesde,fechaHasta).subscribe(
      (resp) => {
        if (resp.status < 400) {// Si no hay error en la respuesta
          this.FechasDisponibles = resp.body!; // se accede al cuerpo de la respuesta
        } else {
          console.log('Error al traer la lista de fechas disponibles');
          alert('Error al obtener la lista de fechas disponibles')
        }
      },
      (err) => {
        console.log('Error al traer la lista de fechas disponibles: ' + err.message);
        throw err;
      }
    );
  }

  isHost(){
    return this.hostRole;
  }

}
