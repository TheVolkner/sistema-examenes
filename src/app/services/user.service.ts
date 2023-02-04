import { Observable, of } from 'rxjs';
import { Login } from './../models/Login.model';
import { Usuario } from './../models/Usuario.model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
//ESTA CLASE DE SERVICIO SE COMUNICARÁ CON EL BACK-END MEDIANTE PETICIONES HTTP
export class UserService {

  //IMPORTAMOS EL SERVICIO HTTP CLIENT
    constructor(private httpClient: HttpClient) { }

    //METODO PARA AGREGAR UN USUARIO ENVIANDOLO AL BACK-END
    agregarUsuario(usuario:Usuario){

      //HACEMOS METODO POST Y ENVIAMOS AL PATH DE LOCALHOST,
      //ENVIAMOS EL OBJETO USUARIO DEL FORMULARIO COMO BODY
      //RETORNAMOS EL RESULTADO, EL CUAL ES UN OBSERVABLE DE USUARIO.
      return this.httpClient.post(`${baseUrl}/usuarios/`,usuario);
    }

    //OBTENEMOS LOS DATOS DEL USUARIO SEGÚN SU USERNAME
    obtenerUsuarioPorUsername(username:string){

      return this.httpClient.get(`${baseUrl}/usuarios/${username}`);
    }


}
