import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/app.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteApiRestService } from '../shared/cliente-api-rest.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-usuario-crear',
  templateUrl: './usuario-crear.component.html',
  styleUrls: ['./usuario-crear.component.css']
})
export class UsuarioCrearComponent implements OnInit {
  usuarioVacio = {
    id: "",
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    enabled: true,
    role: "",
    createdAt: "",
    updatedAt: ""
  }
  usuario = this.usuarioVacio as Usuario;

  id!: String;
  operacion!: String;

  constructor(private ruta: ActivatedRoute, private router: Router, private clienteApiRest: ClienteApiRestService, private datos: DataService) { }

  ngOnInit(): void {
    console.log("En crear-usuario");
  }

  onSubmit(confirmPassword: String) {
    console.log("Enviado formulario");
    if (confirmPassword === this.usuario.password) {
      console.log("Contraseñas comprobadas");
      this.clienteApiRest.addUser(this.usuario).subscribe(resp => {
        if (resp.status < 400) {
          this.datos.cambiarMostrarMensaje(true);
          this.datos.cambiarMensaje(resp.body);
          console.log("Usuario creado");
        } else {
          this.datos.cambiarMostrarMensaje(true);
          this.datos.cambiarMensaje("Error al añadir usuario");
        }
        this.router.navigate(['usuarios']);
      }, err => {
        console.log("Error al crear: " + err.message);
        throw err;
      }
      )
    } else {
      alert("La contraseñas no coninciden. Vuelva a intentarlo.");
    }
  }

}
