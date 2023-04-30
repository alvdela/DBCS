import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteApiRestService } from './shared/cliente-api-rest.service';
import { DataService } from './shared/data.service';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioListarComponent } from './usuario-listar/usuario-listar.component';
import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';
import { FormsModule } from '@angular/forms';
import { UsuarioCrearComponent } from './usuario-crear/usuario-crear.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioListarComponent,
    UsuarioEditarComponent,
    UsuarioCrearComponent,
    UsuarioLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ClienteApiRestService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
