import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './app.model';
import { ClienteApiRestService } from '../shared/cliente-api-rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
  access_token!:string;

  constructor(public router: Router, private clienteApiRest: ClienteApiRestService,) { }

  signIn(user: Usuario) {
    console.log("Enviado login");
    this.clienteApiRest.login(user).subscribe(resp => {
      if (resp.status < 400) {
        console.log("JWT creado");
        this.access_token = resp.body!;
        localStorage.setItem('access_token', this.access_token);
        this.clienteApiRest.getUserByJWT(this.getToken()!).subscribe(resp =>{
          if (resp.status < 400) {
            console.log("CONSEGUIDO USUARIO MEDIANTE JWT");
            this.usuario = resp.body!;
            this.router.navigate(['usuarios']);
          }else{
            console.log("Respuesta fallida al decodificar JWT");
            alert("El email o contraseña introducidos no son correctos.")
          }
        }, err => {
          console.log("Error al decodificar el JWT: " + err.message);
          alert("El email o contraseña introducidos no son correctos.")
          throw err;
        })
      } else {
        console.log("Respuesta fallida al obtener JWT");
        alert("El email o contraseña introducidos no son correctos.")
      }
    }, err => {
      console.log("Error al obtener JWT: " + err.message);
      alert("El email o contraseña introducidos no son correctos.")
      throw err;
    })
  }

  get getUser(): Usuario{
    return this.usuario;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    console.log("DENTRO DE ISLOGGEDIN")
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  getRole(){
    var role = String(this.getUser.role)
    console.log("ROL usuarios getRole. "+this.usuario.role)
    return String(this.usuario.role);
  }

  get isHost(): boolean{
    if(this.getRole() === 'host'){
      return true;
    }else{
      return false
    }
  }

  get isGuest(): boolean{
    if(this.getRole() === 'guest'){
      return true;
    }else{
      return false
    }
  }

  getName(): String{
    
    return String(this.usuario.name)
  }

  getEmail(): String{

    return String(this.usuario.email)
  }

}
