import { PreguntasService } from './../../../services/preguntas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pregunta } from './../../../models/Pregunta.model';
import { Examen } from './../../../models/Examen.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-examen-preguntas',
  templateUrl: './add-examen-preguntas.component.html',
  styleUrls: ['./add-examen-preguntas.component.css'],
})
export class AddExamenPreguntasComponent {
  pregunta: Pregunta = new Pregunta();

  //ATRIBUTOS PARA LOS PARÁMETROS DEL PATH
  id_examen: number;
  titulo: string;

  //ACEDEMOS AL SNACKBAR, EL ACTIVATED ROUTE PARA LOS PARÁMETROS DEL PATH Y EL SERVICE DE PREGUNTA
  constructor(
    private matSnackbar: MatSnackBar,
    private route: ActivatedRoute,
    private preguntaService: PreguntasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //RECIBIMOS LOS PARÁMETROS QUE VIENEN EL PATH DE LA RUTA
    this.id_examen = this.route.snapshot.params['id_examen'];
    this.titulo = this.route.snapshot.params['titulo'];
  }

  enviarForm() {
    //CREAMOS EL OBJETO DE EXAMEN Y SE LO ASIGNAMOS A LA PREGUNTA
    let e = new Examen();

    //LE INDICAMOS SUS ATRIBUTOS
    e.id_examen = this.id_examen;
    e.titulo = this.titulo;

    this.pregunta.examen = e;

    //ELIMINAMOS ESPACIADOS ADICIONALES EN LOS CAMPOS DE LAS OPCIONES Y LA RESPUESTA
    this.pregunta.opcion1 = this.pregunta.opcion1.trim();
    this.pregunta.opcion2 = this.pregunta.opcion2.trim();
    this.pregunta.opcion3 = this.pregunta.opcion3.trim();
    this.pregunta.opcion4 = this.pregunta.opcion4.trim();
    this.pregunta.respuesta = this.pregunta.respuesta.trim();

    this.preguntaService.agregarPregunta(this.pregunta).subscribe(
      (data) => {
        Swal.fire(
          '¡Pregunta agregada!',
          '¡Se ha creado exitosamente en el exámen de ' + this.titulo + '!',
          'success'
        );
        this.router.navigate([
          `/admin/ver-preguntas/${this.id_examen}/${this.titulo}`,
        ]);
      },
      (error) => {
        this.matSnackbar.open(
          '¡Ha ocurrido un error al agregar la pregunta en el servidor!',
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
