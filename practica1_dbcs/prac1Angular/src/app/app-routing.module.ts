import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';
import { UsuarioListarComponent } from './usuario-listar/usuario-listar.component';
import { UsuarioCrearComponent } from './usuario-crear/usuario-crear.component';

const routes: Routes = [
  {path: 'usuarios', component:UsuarioListarComponent},
  {path: 'usuarios/:id/editar', component:UsuarioEditarComponent},
  {path: 'usuarios/nuevo', component:UsuarioCrearComponent},
  {path: '**', redirectTo:'usuarios',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
