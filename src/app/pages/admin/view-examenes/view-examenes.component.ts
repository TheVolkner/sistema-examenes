import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamenService } from '../../../services/examen.service';
import { Examen } from '../../../models/Examen.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css'],
})
export class ViewExamenesComponent implements OnInit {
  //CREAMOS UN OBJETO MODELO DE EXAMENES DONDE RECIBIREMOS LOS EXÁMENES
  examenes: Examen[];

  //ACCEDEMOS AL EXAMEN SERVICE Y EL SNACKBAR
  constructor(
    private examenService: ExamenService,
    private matSnackBar: MatSnackBar
  ) {}

  //AL INICIAR EL COMPONENTE LISTAMOS LOS EXAMENES Y NOS SUSCRIBIMOS AL MÉTODO DEL SERVICE
  ngOnInit(): void {
    this.examenService.listarCuestionarios().subscribe(
      (data: Examen[]) => {
        //OBTENEMOS LOS EXÁMENES Y LOS GUARDAMOS EN EL ARREGLO DE EXÁMENES
        this.examenes = data;
      },
      (error) => {
        this.matSnackBar.open(
          '¡Ha ocurrido un error en el sistema al listar los exámenes!',
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

  //BOTÓN PARA ELIMINAR UN EXAMEN SEGÚN SU ID
  eliminarExamen(id_examen: number) {
    //GENERAMOS CON SWEET ALERT UNA CONFIRMACIÓN PARA ELIMINAR EL EXAMEN
    Swal.fire({
      title: '¿Quieres eliminar este exámen?',
      text: '¡No podrás deshacer el cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Regresar',
    }).then((result) => {
      //OBTENEMOS EL RESULTADO Y COMPROBAMOS SI SE CONFIRMÓ LA ELIMINACIÓN
      if (result.isConfirmed) {
        //SI SE CONFIRMÓ, LLAMAMOS AL SERVICE Y MANDAMOS EL ID A ELIMINAR
        this.examenService.eliminarExamen(id_examen).subscribe(
          (data) => {
            //SI SE ELIMINÓ CORRECTAMENTE, FITLRAMOS LOS EXAMENES PARA RETIRE EL EXAMEN CON EL ID ELIMINADO DEL ARREGLO
            this.examenes = this.examenes.filter(
              (examen: Examen) => examen.id_examen != id_examen
            );

            Swal.fire(
              '¡Exámen Eliminado!',
              'Se ha borrado el examen exitosamente.',
              'success'
            );
            //SI OCURRE UN ERROR, LO MOSTRAMOS
          },
          (error) => {
            this.matSnackBar.open(
              '¡Ha ocurrido un error en el sistema al eliminar el examen!',
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
    });
  }
}
