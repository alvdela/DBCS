import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/app.model';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {
  usuarioVacio = {
    id: "",
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    enabled: true,
    role: "guest",
    createdAt: "",
    updatedAt: ""
  }
  usuario = this.usuarioVacio as Usuario;
  jwt!: String;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    console.log("En usuario-login");
  }

  onSubmit(){
    this.authService.signIn(this.usuario);
  }

}
