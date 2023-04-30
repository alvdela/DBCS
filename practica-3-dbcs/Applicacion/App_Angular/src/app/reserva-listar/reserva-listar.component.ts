import { Component, OnInit } from '@angular/core';
import { Reserva } from '../shared/app.model';
import { AuthService } from '../shared/auth.service';
import { ClienteApiRestService } from '../shared/cliente-api-rest.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-reserva-listar',
  templateUrl: './reserva-listar.component.html',
  styleUrls: ['./reserva-listar.component.css']
})
export class ReservaListarComponent implements OnInit {

  reservaVacia = {
    id: "",
    guestName: "",
    guestEmail: "",
    price: 1,
    units: 1,
    numGuest: 1,
    status: "",
    dateIn: "",
    dateOut: "",
    created_at: "",
    updated_at: ""
  }
  reserva = this.reservaVacia as Reserva;

  Reservas!: Reserva[];
  hostRole:Boolean;
  email!:String;

  constructor(
    private clienteApiRest: ClienteApiRestService,
    public authService: AuthService
  ) {
    this.hostRole = this.authService.isHost
    this.email = this.authService.getEmail
  }

  ngOnInit() {
    if(this.isHost()){
      console.log("Get all reservas host")
      this.getAllReservas();
    }else{
      console.log("guestEmail  "+ this.email)
      this.getReservasGuest(this.email)
    }

  }

  getAllReservas(){
    this.clienteApiRest.getAllReservas().subscribe(
      (resp) => {
        if (resp.status < 400) {// Si no hay error en la respuesta
          this.Reservas = resp.body!; // se accede al cuerpo de la respuesta
        } else {
          console.log('Error al traer la lista host');
          alert('Error al obtener las reservas.')
        }
      },
      (err) => {
        console.log('Error al traer la lista host: ' + err.message);
        throw err;
      }
    );
  }

  getReservasGuest(guestEmail:String){
    this.clienteApiRest.getReservasGuest(guestEmail).subscribe(
      (resp) => {
        if (resp.status < 400) {// Si no hay error en la respuesta
          this.Reservas = resp.body!; // se accede al cuerpo de la respuesta
        } else {
          console.log('Error al traer la lista guest');
          alert('Error al obtener las reservas.')
        }
      },
      (err) => {
        console.log('Error al traer la lista guest: ' + err.message);
        throw err;
      }
    );
  }

  modifyReserva(reservaID:String,status:String,guestName:String){
    this.reserva.status = status;
    this.reserva.guestName = guestName;
    this.clienteApiRest.modifyReserva(reservaID,this.reserva).subscribe(
      (resp) => {
        if (resp.status < 400) {// Si no hay error en la respuesta
          this.Reservas = resp.body!; // se accede al cuerpo de la respuesta
          this.getAllReservas();
        } else {
          console.log('Error al traer la lista host');
          alert('Error al obtener las reservas.')
        }
      },
      (err) => {
        console.log('Error al traer la lista host: ' + err.message);
        throw err;
      }
    );
  }

  isHost(){
    return this.hostRole;
  }

  logout(){
    console.log("Logout")
    this.authService.doLogout();
  }


}
