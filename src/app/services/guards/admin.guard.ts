import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable()
//ESTE GUARDIAN SE ENCARGARÁ DE VALIDAR EL ACCESO A LOS PATH QUE REQUIERAN ROL DE ADMINISTRADOR
export class AdminGuard implements CanActivate{

  //INYECTAMOS LOS SERVICIOS DE ROUTER Y LOGIN SERVICE
  constructor(private loginService:LoginService,
    private router:Router){}

  //IMPLEMENTAMOS EL METODO CAN ACTIVATE PARA APLICAR EL GUARDIAN
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    //COMPROBAMOS PRIMERO SI EL USUARIO ESTÁ LOGEADO ACTUALMENTE Y SI SU ROL ES DE ADMINISTRADOR
      if(this.loginService.isLoggedin){

        if(this.loginService.getUserRoles() == 'ADMIN'){

        //DE SER VALIDADO, CONTINUA SU NAVEGACIÓN
        return true;

        } else {

          //SI ESTÁ LOGEADO PERO NO ES ADMINISTRADOR, ENTONCES ES USUARIO
          this.router.navigate(['user-dashboard']);
          return false;
        }

      } else {

        //DE LO CONTRARIO,SE LE REDIRECCIONA AL LOGIN.
        this.router.navigate(['login']);
        return false;
      }
  }
}
