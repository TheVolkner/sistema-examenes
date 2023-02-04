import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Login } from './../models/Login.model';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable()
//ESTE SERVICIO SE COMUNICARÁ CON EL CONTROLADOR DE LOGIN EN EL BACK-END PARA MANEJO DE SESIONES
export class LoginService {

  //EL LOGIN STATUS SUBJECT DEFINE EL ESTADO DE LA SESIÓN, Y PERMITE SABER SI EL USUARIO ESTÁ ACTUALMENTE
  //LOGEADO O NO, AL SER UN OBSERVABLE PODEMOS ESTAR AL PENDIENTE DE SU SITUACIÓN
  public loginStatusSubject = new Subject<boolean>();

  //IMPORTAMOS EL SERVICIO HTTP CLIENT
  constructor(private httpClient: HttpClient) {}

  //METODO PARA HCER LOGIN Y GENERAR EL JWT TOKEN
  login(loginUser: Login) {
    //EL LOGIN COMPONENT ENVIA EL USERNAME Y PASSWORD, Y ESO ENVIAMOS AL BACK END PARA LOGEAR
    return this.httpClient.post(`${baseUrl}/auth/login`, loginUser);
  }

  //DESPUÉS DE HACER LOGIN, GUARDAMOS EL TOKEN EL LOCAL STORAGE
  saveToken(tokenJWT: string) {
    //GUARDAMOS EL TOKEN PARA UTILIZAR EN OPERACIONES ACÁ EN ANGULAR
    localStorage.setItem('token', tokenJWT);
  }

  //COMPROBAMOS SI EL TOKEN DE SESIÓN ESTÁ EN EL LOCAL STORAGE PARA DEFINIR SI EXISTE O NO UNA SESIÓN
  isLoggedin() {
    //OBTENEMOS EL TOKEN DEL LOCAL STORAGE
    let token = localStorage.getItem('token');

    //COMPROBAMOS SI EL TOKEN OBTENIDO EXISTE
    if (token == undefined || token == null || token == '') {
      //DE NO EXISTIR, NO HAY SESIÓN
      return false;
    } else {
      //SI ESTÁ, INDICAMOS QUE SI HAY SESIÓN
      return true;
    }
  }

  //HACEMOS LOGOUT Y ELIMINAMOS EL TOKEN Y EL USER DEL LOCAL STORAGE
  logout() {
    //REMOVEMOS EL TOKEN DEL LOCAL STORAGE
    localStorage.removeItem('token');
    //REMOVEMOS EL USUARIO DEL LOCAL STORAGE
    localStorage.removeItem('user');
  }

  //RETORNAMOS EL TOKEN DEL LOCAL STORAGE
  getToken() {
    //OBTENEMOS EL TOKEN DEL LOCAL STORAGE
    let token = localStorage.getItem('token');

    //COMPROBAMOS SI EL TOKEN OBTENIDO EXISTE
    if (token == undefined || token == null || token == '') {
      //DE NO EXISTIR, NO HAY SESIÓN
      return '';
    } else {
      //SI ESTÁ, INDICAMOS QUE SI HAY SESIÓN
      return token;
    }
  }

  //INDICAMOS EL USUARIO DE ESTA SESIÓN
  setUser(user: any) {
    //GUARDAMOS EN LOCAL STORAGE INDICANDO EL USER COMO STRINGIFY PARA QUE SEA UN JSON
    localStorage.setItem('user', JSON.stringify(user));
  }

  //OBTENEMOS EL USER ACTUAL
  getUser() {
    //OBTENEOS EL USUARIO DEL LOCAL STORAGE
    let userStr = localStorage.getItem('user');

    if (userStr == undefined || userStr == null || userStr == '') {
      //DE NO EXISTIR, NO HAY USUARIO AGREGADO
      //POR LO TANTO, NO DEBERÍA HABER SESIÓN ACTIVA
      this.logout();
      return false;
    } else {
      //TRANSFORMAMOS EL JSON A OBJECT Y LO DEVOLVEMOS
      return JSON.parse(userStr);
    }
  }

  //OBTENEMOS LOS ROLES VINCULADOS AL USUARIO
  getUserRoles() {
    //LLAMAMOS AL METODO GET USER PARA LEER EL USUARIO
    let user = this.getUser();

    if (user != false) {
      return user.authorities[0].authority;
    } else {
      return '';
    }
  }

  //OBTENER EL USUARIO ACTUAL LOGEADO EN EL SISTEMA
  getCurrentUser() {
    return this.httpClient.get(`${baseUrl}/auth/user-actual`);
  }

  //OBTENEMOS LOS DATOS DEL USUARIO SEGÚN SU USERNAME
  obtenerUsuarioPorUsername(username: string) {
    return this.httpClient.get(`${baseUrl}/auth/${username}`);
  }
}
