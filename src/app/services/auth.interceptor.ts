import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

@Injectable()
//UN INTERCEPTOR SE ENCARGADA DE INTERCEPTAR TODAS LAS PETICIONES DE ENTRADA O SALIDA ENTRE EL SERVIDOR
//Y LA APP ANGULAR
export class AuthIncerceptor implements HttpInterceptor {
  //VAMOS A INTERCEPTAR LAS PETICIONES HTTP DEL LOGIN
  constructor(private loginService: LoginService) {}

  //AGREGAMOS LA INTERCEPCIÓN PARA AGREGAR EL TOKEN A CADA PETICIÓN HTTP,MENOS AL LOGIN
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //GENERAMOS UNA COPIA DE LA PETICION ACTUAL PARA NO MODIFICIAR LA ORIGINAL
    let authReq = req;

    //SOLICITAMOS EL TOKEN AL SERVICE
    const token = this.loginService.getToken();

    //COMPROBAMOS SI EXISTE UN TOKEN
    if (token != null && token != '') {
      console.log('ENTRANDO AL IF DEL TOKEN EXISTENTE');
      //SI EXISTE, CLONAMOS LA PETICION OBTENIDA PARA EMPEZAR A MODIFICARLA
      authReq = authReq.clone({
        //AGREGAMOS EL TOKEN AL HEADER
        setHeaders: { Authorization:`Bearer ${token}`},
      });
    }

    //DEVOLVEMOS LA PETICIÓN YA MODIFICADA SI EXISTIÓ EL TOKEN, DE NO EXISTIR SERÁ LA MISMA PETICIÓN
    return next.handle(authReq);
  }
}

//GENERAMOS UNA CLASE PARA EXPORTAR QUE SERÁ LA PROVEEDORA DEL INTERCEPTOR
export const AuthIncerceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthIncerceptor,
    multi: true,
  },
];
