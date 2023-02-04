import { UserService } from './../../services/user.service';

import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  //CREAMOS DOS ATRIBUTOS PARA OBTENER EL CASO DE QUE EL USERNAME DEL USUARIO
  //BASADO EN SI ESTÁ LOGEADO O NO.
  isLoggedIn = false;
  user:any = null;

  constructor(public loginService:LoginService,
    public router:Router,
    private userService:UserService){

     }

     //AL CARGAR EL COMPONENTE,ACCEDEMOS AL LOGIN SERVICE Y SOLICITAMOS SI HAY SESIÓN ACTIVA
     //ADEMAS, SOLICITAMOS EL USER, Y OBSERVAMOS EL LOGIN STATUS SUBJECT QUE DEFINE EL ESTADO DE LA SESIÓN
     ngOnInit(): void {
      //LEEMOS LA PRIMERA VEZ LOS DATOS DE LOGGED IN Y GET USER
      this.isLoggedIn = this.loginService.isLoggedin();
      this.user = this.loginService.getUser();
      //OBSERVAMOS EL LOGIN STATUS SUBJECT PARA ESTAR AL PENDIENTE DE SI SE ABRE/CIERRA LA SESIÓN O SE CAMBIA DE USER
      this.loginService.loginStatusSubject.asObservable().subscribe(
        data => {
          this.isLoggedIn = this.loginService.isLoggedin();
          this.user = this.loginService.getUser();
          console.log('Sesión:' + this.isLoggedIn + ", Usuario: " + this.user.username);
        }
      )
    }


    //ESTE MÉTODO ES LLAMADO DESDE EL LINK DEL HEADER.
    logout(){

      //COMUNICA CON EL SERVICE PARA HACER LOGOUT
      this.loginService.logout();
      //INDICAMOS QUE NO HAY SESIÓN ACTIVA
      this.loginService.loginStatusSubject.next(false);
      this.router.navigate(['login']);
    }

}
