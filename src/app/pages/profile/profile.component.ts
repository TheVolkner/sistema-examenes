import { Usuario } from 'src/app/models/Usuario.model';
import { UserService } from './../../services/user.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  //ATRIBUTO PARA OBTENER EL USUARIO LOGEADO
  LoggedUser:any = null;

  //ATRIBUTO PARA OBTENER LOS DATOS DEL USUARIO ACTUAL
  usuario:Usuario = new Usuario();

  constructor(private loginService:LoginService){ }

  //AL CARGAR EL COMPONENTE OBTENEMOS EL USUARIO LOGEADO
  ngOnInit(): void {
    //OBTENEMOS EL OBJETO USER QUE CONTIENE EL USERNAME
    this.LoggedUser = this.loginService.getUser();
    console.log(this.LoggedUser);
    //OBTENEMOS LOS DATOS DEL USUARIO LOGEADO SEGÚN SU USER
    this.loginService.obtenerUsuarioPorUsername(this.LoggedUser.username).subscribe(
      (user:Usuario) => {
        this.usuario = user;
      }, (error) => console.log(error)
    );
  }

}
