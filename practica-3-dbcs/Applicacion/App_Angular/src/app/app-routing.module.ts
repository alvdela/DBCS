import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';
import { UsuarioListarComponent } from './usuario-listar/usuario-listar.component';
import { UsuarioCrearComponent } from './usuario-crear/usuario-crear.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { ReservaCrearComponent } from './reserva-crear/reserva-crear.component';
import { ReservaListarComponent } from './reserva-listar/reserva-listar.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: 'usuarios', component:UsuarioListarComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/:id/editar', component:UsuarioEditarComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/nuevo', component:UsuarioCrearComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/:id/reservas', component:ReservaListarComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/:id/reservas/crear', component:ReservaCrearComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/reservas', component:ReservaListarComponent, canActivate: [AuthGuard]},
  {path: 'login', component:UsuarioLoginComponent},
  {path: '**', redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
