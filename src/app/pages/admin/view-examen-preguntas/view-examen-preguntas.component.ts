import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreguntasService } from './../../../services/preguntas.service';
import { Pregunta } from './../../../models/Pregunta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-view-examen-preguntas',
  templateUrl: './view-examen-preguntas.component.html',
  styleUrls: ['./view-examen-preguntas.component.css']
})
export class ViewExamenPreguntasComponent implements OnInit{

  //GENERAMOS DOS ATRIBUTOS PARA RECIBIR LOS DOS PARÁMETROS QUE VIENEN EN EL PATH
  id_examen:number;
  titulo:string;

  //CREAMOS UN ARREGLO DE PREGUNTAS DONDE RECIBIREMOS LAS PREGUNTAS DEL EXAMEN
  preguntas:Pregunta[];

  //ACCEDEMOS A ROUTE PARA RECIBIR PARÁMETROS EN EL PATH
  constructor(private route:ActivatedRoute,
    private preguntaService:PreguntasService,
    private matSnackbar:MatSnackBar){}

  ngOnInit(): void {

    //RECIBIMOS LOS PARÁMETROS QUE VIENEN EL PATH DE LA RUTA
    this.id_examen = this.route.snapshot.params['id_examen'];
    this.titulo = this.route.snapshot.params['titulo'];
    console.log('ID:' + this.id_examen);
    console.log('Título:' + this.titulo);

    //COMUNICAMOS CON EL SERVICE Y SOLICITAMOS LAS PREGUNTAS SEGÚN EL ID DEL EXAMEN ASOCIADO
    this.preguntaService.buscarPreguntasPorExamenId(this.id_examen).subscribe(
      (data:Pregunta[]) => {

        //RECIBIMOS EL RESULTADO Y LO ASIGNAMOS AL ARREGLO DE PREGUNTAS.
        this.preguntas = data;
        console.log(this.preguntas);

        //SI HAY ERROR,LO MOSTRAMOS.
      }, (error) => {
        this.matSnackbar.open(
          '¡Ha ocurrido un error al listar las preguntas del examen!',
          'Aceptar',
          {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left',
          }
        );
      }
    );
  }

  //BOTÓN PARA ELIMINAR UNA PREGUNTA DEL EXÁMEN SEGÚN SU ID
  eliminarPregunta(pregunta_id:number){

    //GENERAMOS CON SWEET ALERT UNA CONFIRMACIÓN PARA ELIMINAR LA PREGUNTA
    Swal.fire({
      title: '¿Quieres eliminar esta pregunta?',
      text: '¡No podrás deshacer el cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Regresar',
    }).then((result) => {
      //OBTENEMOS EL RESULTADO Y COMPROBAMOS SI SE CONFIRMÓ LA ELIMINACIÓN
      if (result.isConfirmed) {
        console.log('ENTRANDO A SWAL CONFIRM');
        //SI SE CONFIRMÓ, LLAMAMOS AL SERVICE Y MANDAMOS EL ID A ELIMINAR
        this.preguntaService.eliminarPregunta(pregunta_id).subscribe(
          (data) => {
            //SI SE ELIMINÓ CORRECTAMENTE, FITLRAMOS LAS PREGUNTAS QUE PARA RETIRE LA PREGUNTA CON EL ID ELIMINADO DEL ARREGLO
            this.preguntas = this.preguntas.filter(
              (pregunta: Pregunta) => pregunta.pregunta_id != pregunta_id
            );

            Swal.fire(
              '¡Exámen Eliminado!',
              'Se ha borrado el examen exitosamente.',
              'success'
            );
            //SI OCURRE UN ERROR, LO MOSTRAMOS
          },
          (error) => {
            this.matSnackbar.open(
              '¡Ha ocurrido un error en el sistema al eliminar la pregunta!',
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
    });

  }

}
