import { LoginService } from './../login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//ESTE GUARDIAN SE ENCARGARÁ DE VALIDAR EL ACCESO A LOS PATH QUE REQUIERAN ROL DE USUARIO
export class NormalGuard implements CanActivate {

  //INYECTAMOS LOS SERVICIOS DE ROUTER Y LOGIN SERVICE
  constructor(private loginService:LoginService,
    private router:Router){}

  //IMPLEMENTAMOS EL METODO CAN ACTIVATE PARA APLICAR EL GUARDIAN
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        //COMPROBAMOS PRIMERO SI EL USUARIO ESTÁ LOGEADO ACTUALMENTE Y SI SU ROL ES DE USUARIO
        if(this.loginService.isLoggedin && this.loginService.getUserRoles() == 'USER'){

          //DE SER VALIDADO, CONTINUA SU NAVEGACIÓN
          return true;

        } else {

          //DE LO CONTRARIO,SE LE REDIRECCIONA AL LOGIN.
          this.router.navigate(['login']);
          return false;
        }

  }

}
