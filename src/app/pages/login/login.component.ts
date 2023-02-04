import { Token } from './../../models/Token.model';
import { LoginService } from './../../services/login.service';
import { UserService } from './../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

// IMPORTAMOS SWEET ALERT 2 PARA MOSTRAR MENSAJES
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  //CREAMOS LOS ATRIBUTOS VINCULADOS CON LOS CAMPOS DEL FORMULARIO
  username: String;
  password: String;

  //INYECTAMOS EL SERVICIO DE USER SERVICES, EL SNACK BAR PARA LAS ALERTAS, EL LOGIN SERVICE
  //Y EL ROUTER PARA NAVEGAR ENTRE RUTAS DEL APP-ROUTING
  constructor(
    private userServices: UserService,
    private matSnackBar: MatSnackBar,
    private loginService: LoginService,
    private route: Router
  ) {}

  //EL FORMULARIO SE VALIDA MEDIANTE EL NG FORM EN LA PLANTILLA, SI TODO ESTA BIEN ENVIAMOS DIRECTAMENTE
  //EL VALOR DEL FORMULARIO, QUE SERÁ RECIBIDO EN EL SERVICE COMO UN OBJETO USUARIO
  validarForm(form: NgForm) {
    this.loginService.login(form.value).subscribe(
      (data: Token) => {
        //ENVIAMOS EL TOKEN JWT PROVENIENTE DE LA RESPUESTA A GUARDARSE EN EL SERVICE
        this.loginService.saveToken(data.token);
        //LUEGO OBTENEMOS EL USUARIO ACTUAL LOGEADO
        this.loginService.getCurrentUser().subscribe((user: any) => {
          //OBTENEMOS EL USUARIO DE SPRING SECURITY QUE TIENE EL USUARIO, EL PASSWORD Y UN ARREGLO DE ROLES
          //DEL USUARIO LOGEADO Y LO ENVIAMOS AL SERVICE PARA GUARDARLO
          this.loginService.setUser(user);
          console.log(user);

          //COMPROBAMOS EL SI EL ROL DEL USUARIO ES ADMIN
          if (this.loginService.getUserRoles() == 'ADMIN') {
            //SI ES ADMIN, REDIRIGMOS
            this.route.navigate(['admin']);
            //LE INDICAMOS AL LOGIN SERVICE QUE ESTÉ EL LOGIN STATUS ESTÁ ACTIVO
            this.loginService.loginStatusSubject.next(true);
          } else if (this.loginService.getUserRoles() == 'USER') {
            //SI NO ES ADMIN,COMPROBAMOS ENTONCES QUE SEA UN USUARIO NORMAL Y REDIRIGMOS
            this.route.navigate(['user-dashboard/categoria/0']);
            this.loginService.loginStatusSubject.next(true);
          } else {
            //DE LO CONTRARIO, DEBE HABER UN ERROR DE SESIÓN. REDIRIGIMOS AL LOGIN.
            this.route.navigate(['login']);
          }
        });
      },
      (error) => {
        this.matSnackBar.open(
          '¡Ha ocurrido un error en el sistema al iniciar sesión!',
          'Aceptar',
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'left',
          }
        );
        console.log(error);
      }
    );
  }

  //COMPROBAR EL FORMULARIO PARA INDICARLE AL USUARIO QUE DEBE LLENAR LOS CAMPOS
  checkForm(form: NgForm) {
    //COMPROBAMOS SI ES VALIDO
    if (!form.valid) {
      //INDICAMOS EL SNACK BAR CON EL MENSAJE DE ALERTA DE QUE LLENE LOS CAMPOS
      //INDICAMOS EN LA CONFIG LA DURACIÓN, Y LA POSICION X E Y
      this.matSnackBar.open(
        '¡Recuerde indicar el usuario y una contraseña de minimo 6 digitos!',
        'Aceptar',
        {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        }
      );
    }
  }
}
