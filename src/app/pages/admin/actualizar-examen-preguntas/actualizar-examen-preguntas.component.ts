import Swal from 'sweetalert2';
import { Examen } from './../../../models/Examen.model';
import { PreguntasService } from './../../../services/preguntas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pregunta } from './../../../models/Pregunta.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualizar-examen-preguntas',
  templateUrl: './actualizar-examen-preguntas.component.html',
  styleUrls: ['./actualizar-examen-preguntas.component.css']
})
export class ActualizarExamenPreguntasComponent implements OnInit{

  pregunta:Pregunta = new Pregunta();

  //ATRIBUTOS PARA LOS PARÁMETROS DEL PATH
  id_pregunta:number;
  id_examen:number;
  titulo:string;

    //ACEDEMOS AL SNACKBAR, EL ACTIVATED ROUTE PARA LOS PARÁMETROS DEL PATH Y EL SERVICE DE PREGUNTA
    constructor(private matSnackbar:MatSnackBar,
      private route:ActivatedRoute,
      private preguntaService:PreguntasService,
      private router:Router){}

    ngOnInit(): void {
    //RECIBIMOS LOS PARÁMETROS QUE VIENEN EL PATH DE LA RUTA
    this.id_examen = this.route.snapshot.params['id_examen'];
    this.titulo = this.route.snapshot.params['titulo'];
    this.id_pregunta = this.route.snapshot.params['pregunta_id'];

    //OBTENEMOS LOS DATOS DE LA PREGUNTA SEGÚN SU ID
    this.preguntaService.buscarPreguntaPorId(this.id_pregunta).subscribe(
      (data:Pregunta) => {

        this.pregunta = data;
        console.log(this.pregunta);

      },(error) => {
        this.matSnackbar.open(
          '¡Ha ocurrido un error al listar las preguntas desde el servidor!',
          'Aceptar',
          {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          }
        );

      }
    );
    }

    enviarForm(){

      //CREAMOS EL OBJETO DE EXAMEN Y SE LO ASIGNAMOS A LA PREGUNTA
      let e = new Examen();

      //LE INDICAMOS SUS ATRIBUTOS
      e.id_examen = this.id_examen;
      e.titulo = this.titulo;

      //AGREGAMOS EL EXAMEN A LA PREGUNTA PARA ACTUALIZAR
      this.pregunta.examen = e;

      //ELIMINAMOS ESPACIADOS ADICIONALES EN LOS CAMPOS DE LAS OPCIONES Y LA RESPUESTA
      this.pregunta.opcion1 = this.pregunta.opcion1.trim();
      this.pregunta.opcion2 = this.pregunta.opcion2.trim();
      this.pregunta.opcion3 = this.pregunta.opcion3.trim();
      this.pregunta.opcion4 = this.pregunta.opcion4.trim();
      this.pregunta.respuesta = this.pregunta.respuesta.trim();

      this.preguntaService.actualizarPregunta(this.pregunta).subscribe(
        (data) => {
          Swal.fire('¡Pregunta actualizada!', '¡Modificación exitosa en la pregunta de ' + this.titulo + "!", 'success');
          this.router.navigate([`/admin/ver-preguntas/${this.id_examen}/${this.titulo}`]);
        },(error) => {
          this.matSnackbar.open(
            '¡Ha ocurrido un error al modificar la pregunta en el servidor!',
            'Aceptar',
            {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
            }
          );
        }
      );

    }



    //COMPROBAR EL FORMULARIO PARA INDICARLE AL USUARIO QUE DEBE LLENAR LOS CAMPOS
    checkForm(form: NgForm) {

      console.log('Entrando al método checkForm');

      //COMPROBAMOS SI ES VALIDO
      if (!form.valid) {
        //INDICAMOS EL SNACK BAR CON EL MENSAJE DE ALERTA DE QUE LLENE LOS CAMPOS
        //INDICAMOS EN LA CONFIG LA DURACIÓN, Y LA POSICION X E Y
        this.matSnackbar.open(
          '¡Recuerde llenar todos los campos correctamente!',
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
