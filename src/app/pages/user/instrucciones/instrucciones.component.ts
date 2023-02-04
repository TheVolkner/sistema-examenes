import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from './../../../services/examen.service';
import { Examen } from './../../../models/Examen.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.css']
})
export class InstruccionesComponent{


  //HACEMOS LOS ATRIBUTOS PARA RECIBIR EL ID DEL PATH Y EL EXAMEN DEL SERVICE
  id_examen:number;
  examen:Examen = new Examen();


  //ACEDEMOS AL SERVICE DE EXAMEN Y AL ACTIVATED ROUTE PARA LOS PARAMETROS, EL SNACKBAR Y ROUTER PARA NAVEGAR
  constructor(private examenService:ExamenService,
    private route:ActivatedRoute,
    private matSnackbar:MatSnackBar,
    private router:Router){

      //GUARDAMOS EL ID DEL PATH
      this.id_examen = this.route.snapshot.params['id_examen'];
      //SOLICITAMOS LOS DATOS DEL EXÁMEN SEGÚN ESE ID RECIBIDO
      this.examenService.obtenerExamenPorId(this.id_examen).subscribe(
        (data:Examen) => {
          this.examen = data;
          console.log(this.examen);
        },(error) => {
          this.matSnackbar.open(
            '¡Ha ocurrido un error en el sistema al listar el exámen!',
            'Aceptar',
            {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'left',
            }
          );
          console.log(error);
        }
      );
    }

    empezarExamen(){

      //GENERAMOS CON SWEET ALERT UNA CONFIRMACIÓN PARA ELIMINAR LA PREGUNTA
    Swal.fire({
      title: '¿Quieres empezar este examen?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#093FBC',
      confirmButtonText: 'Empezar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        this.router.navigate([`/start/${this.id_examen}`]);

      }
    });
    }
}
