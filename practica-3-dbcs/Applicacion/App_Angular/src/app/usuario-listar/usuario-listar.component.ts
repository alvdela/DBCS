import { Component, OnInit } from '@angular/core';
import { ClienteApiRestService } from '../shared/cliente-api-rest.service';
import { Usuario } from '../shared/app.model';
import { DataService } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css'],
})
export class UsuarioListarComponent implements OnInit {
  Usuarios!: Usuario[];
  mostrarMensaje!: boolean;
  mensaje!: string;
  idsList: String[] = [];
  hostRole:Boolean;

  constructor(
    private clienteApiRest: ClienteApiRestService,
    private datos: DataService,
    public authService: AuthService
  ) {
    this.hostRole = this.authService.isHost
  }

  ngOnInit() {
    console.log('Dentro funcion ngOnInit de Listar');
    this.datos.mostrarMensajeActual.subscribe(
      (valor) => (this.mostrarMensaje = valor)
    );
    console.log('Valor actual de si mostrar mensaje: ' + this.mostrarMensaje);
    this.datos.mensajeActual.subscribe((valor) => (this.mensaje = valor));
    console.log('Valor actual del mensaje: ' + this.mensaje);
    this.clienteApiRest.getAllUsers().subscribe(
      (resp: Usuario[]) => {
        resp.forEach(function (data) {
          console.log('Nombre: ' + data);
        });
      },
      (err) => console.log('Error: ' + err)
    );
    this.getUsuarios_AccesoResponse();
  }

  getUsuarios_AccesoResponse() {
    this.clienteApiRest.getAllUsers_ConResponse().subscribe(
      (resp) => {
        if (resp.status < 400) {// Si no hay error en la respuesta
          this.Usuarios = resp.body!; // se accede al cuerpo de la respuesta
        } else {
          this.mensaje = 'Error al acceder a los datos';
          this.mostrarMensaje = true;
        }
      },
      (err) => {
        console.log('Error al traer la lista: ' + err.message);
        throw err;
      }
    );
  }

  getUsuariosActivos() {
    this.clienteApiRest.getUsersEnabled().subscribe(
      (resp) => {
        if (resp.status < 400) {// Si no hay error en la respuesta
          this.Usuarios = resp.body!; // se accede al cuerpo de la respuesta
        } else {
          this.mensaje = 'Error al acceder a los registros activos';
          this.mostrarMensaje = true;
        }
      },
      (err) => {
        console.log('Error al traer la lista de activos: ' + err.message);
        throw err;
      }
    );
  }

  getUsuariosInactivos() {
    this.clienteApiRest.getUsersDisabled().subscribe(
      (resp) => {
        if (resp.status < 400) {// Si no hay error en la respuesta
          this.Usuarios = resp.body!; // se accede al cuerpo de la respuesta
        } else {
          this.mensaje = 'Error al acceder a los registros inactivos';
          this.mostrarMensaje = true;
        }
      },
      (err) => {
        console.log('Error al traer la lista de inactivos: ' + err.message);
        throw err;
      }
    );
  }

  getUsersController(value: String) {
    switch (value) {
      case 'todosFiltro':
        this.getUsuarios_AccesoResponse();
        break;
      case 'activosFiltro':
        this.getUsuariosActivos();
        break;
      case 'inactivosFiltro':
        this.getUsuariosInactivos();
        break;
      default:
        this.getUsuarios_AccesoResponse();
    }
  }

  activarController(value: String, id: String) {
    this.idsList.push(id);
    switch (value) {
      case 'activo':
        this.activar(this.idsList);
        break;
      case 'inactivo':
        this.desactivar(this.idsList);
        break;
      default:
        this.activar(this.idsList);
    }
    this.idsList = [];
  }

  activar(ids: String[]) {
    this.clienteApiRest.enableUsers(ids).subscribe(
      (resp) => {
        if (resp.status < 400) {
          this.mostrarMensaje = true;
          this.mensaje = resp.body;
          this.getUsuarios_AccesoResponse();
        } else {
          this.mostrarMensaje = true;
          this.mensaje = 'Error al activar registro';
        }
      },
      (err) => {
        console.log('Error al activar: ' + err.message);
        throw err;
      }
    );
  }

  desactivar(ids: String[]) {
    this.clienteApiRest.disableUsers(ids).subscribe(
      (resp) => {
        if (resp.status < 400) {
          this.mostrarMensaje = true;
          this.mensaje = resp.body;
          this.getUsuarios_AccesoResponse();
        } else {
          this.mostrarMensaje = true;
          this.mensaje = 'Error al desactivar registro';
        }
      },
      (err) => {
        console.log('Error al desactivar: ' + err.message);
        throw err;
      }
    );
  }

  borrar(id: String) {
    console.log('BORRAR');
    if (confirm('¿Realmente desea borrar al usuario con id: ' + id)) {
      this.clienteApiRest.deleteUser(id).subscribe(
        (resp) => {
          if (resp.status < 400) {
            this.mostrarMensaje = true;
            this.mensaje = resp.body;
            this.getUsuarios_AccesoResponse();
          } else {
            this.mostrarMensaje = true;
            this.mensaje = 'Error al eliminar registro';
          }
        },
        (err) => {
          console.log('Error al eliminar: ' + err.message);
          throw err;
        }
      );
    }
  }

  logout(){
    console.log("Logout")
    this.authService.doLogout();
  }

  isHost(){
    return this.hostRole;
  }
}
