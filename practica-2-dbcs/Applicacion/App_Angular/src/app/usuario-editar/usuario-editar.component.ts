import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/app.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClienteApiRestService } from '../shared/cliente-api-rest.service';
import { Observable } from 'rxjs';
import { DataService } from '../shared/data.service';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit {

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

  ngOnInit() {
    console.log("En editar-usuario");
    this.operacion = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].path;//operacion en final de la Url
    if (this.operacion == "editar") {
      console.log("En Editar");
      this.ruta.paramMap.subscribe(params => { this.id = params.get('id')!; },
        err => console.log("Error al leer id para editar: " + err))
      //Obtenemos el id
      this.clienteApiRest.getUsuario(this.id).subscribe(resp => { this.usuario = resp.body!; },
        err => { console.log("Error al traer el usuario: " + err.message); throw err; })
      //Obtenemos el usuario con ese id
    }
  }

  onSubmit(newPassword: String, confirmPassword: String) {
    console.log("Enviado formulario");

    if (confirmPassword === "" || confirmPassword == null) {
      this.usuario.password = "";
    }
    if (confirmPassword === newPassword) {
      console.log("Contraseñas comprobadas");
      this.usuario.password = newPassword;
      this.clienteApiRest.modifyUser(String(this.usuario.id), this.usuario).subscribe(
        resp => {
          if (resp.status < 400) {
            this.datos.cambiarMostrarMensaje(true);
            this.datos.cambiarMensaje(resp.body);
          } else {
            this.datos.cambiarMostrarMensaje(true);
            this.datos.cambiarMensaje("Error al modificar");
          }
          this.router.navigate(['usuarios']);
        }, err => { console.log("Error al editar: " + err.message); throw err; })
    } else {
      alert("La contraseñas no coninciden. Vuelva a intentarlo.");
    }
  }
}
