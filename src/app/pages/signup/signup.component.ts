import { UserService } from './../../services/user.service';
import { Usuario } from './../../models/Usuario.model';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

// IMPORTAMOS SWEET ALERT 2 PARA MOSTRAR MENSAJES
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  //CREAMOS LOS ATRIBUTOS VINCULADOS CON LOS CAMPOS DEL FORMULARIO
  nombre:String;
  apellido:String;
  username:String;
  password:String;
  email:String;
  telefono:String;

  //INYECTAMOS EL SERVICIO DE USER SERVICES
  constructor(private userServices: UserService,
    private matSnackBar:MatSnackBar) {}

  //EL FORMULARIO SE VALIDA MEDIANTE EL NG FORM EN LA PLANTILLA, SI TODO ESTA BIEN ENVIAMOS DIRECTAMENTE
  //EL VALOR DEL FORMULARIO, QUE SERÁ RECIBIDO EN EL SERVICE COMO UN OBJETO USUARIO
  validarForm(form:NgForm) {
    this.userServices.agregarUsuario(form.value)
    .subscribe(
      (data) => {
        Swal.fire('¡Usuario agregado!',
        'El usuario ha sido añadido exitosamente en el sistema.',
        'success');
        console.log(data);
      },
      (error) => {
        this.matSnackBar.open('¡Ha ocurrido un error en el sistema!','Aceptar',{
          duration:3000,
          verticalPosition: 'top',
          horizontalPosition: 'left'
        });
        console.log(error);
      }
    )
  }

  //COMPROBAR EL FORMULARIO PARA INDICARLE AL USUARIO QUE DEBE LLENAR LOS CAMPOS
  checkForm(form:NgForm){

    //COMPROBAMOS SI ES VALIDO
    if(!form.valid){

      //INDICAMOS EL SNACK BAR CON EL MENSAJE DE ALERTA DE QUE LLENE LOS CAMPOS
      //INDICAMOS EN LA CONFIG LA DURACIÓN, Y LA POSICION X E Y
      this.matSnackBar.open('¡Debe llenar todos los campos correctamente!','Aceptar',{
        duration:3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    }
  }
}
