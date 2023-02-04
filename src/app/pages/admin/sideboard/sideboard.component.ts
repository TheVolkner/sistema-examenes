import { Router } from '@angular/router';
import { LoginService } from './../../../services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sideboard',
  templateUrl: './sideboard.component.html',
  styleUrls: ['./sideboard.component.css']
})
export class SideboardComponent {

  //ACCEDEMOS AL LOGIN SERVICE Y AL ROUTER PARA NAVEGAR
  constructor(private loginService:LoginService,
    private router:Router){}

    //ESTE MÉTODO ES LLAMADO DESDE EL BOTÓN DEL SIDEBOARD
    logout(){

      //COMUNICA CON EL SERVICE PARA HACER LOGOUT
      this.loginService.logout();
      //INDICAMOS QUE NO HAY SESIÓN ACTIVA
      this.loginService.loginStatusSubject.next(false);
      this.router.navigate(['login']);
    }
}
