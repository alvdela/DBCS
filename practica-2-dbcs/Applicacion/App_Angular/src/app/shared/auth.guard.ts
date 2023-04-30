import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../shared/auth.service';
import { Router } from '@angular/router';
import { AUTO_STYLE } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.authService.getRole())
      const role = this.authService.getRole()
      if(this.authService.isLoggedIn && (this.authService.isGuest || this.authService.isHost)){
          return true;
      }
      console.log("Acceso rechazado");
      this.router.navigate(['login']);
      return false;
  }
  
}
