import { Router } from '@angular/router';
import { ExamenService } from './../../../services/examen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { Examen } from './../../../models/Examen.model';
import { Categoria } from './../../../models/Categoria.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-examenes',
  templateUrl: './add-examenes.component.html',
  styleUrls: ['./add-examenes.component.css'],
})
export class AddExamenesComponent implements OnInit {
  categorias: Categoria[];

  //CREAMOS LOS CAMPOS VINCULADOS CON EL FORMULARIO EN LA PLANTILLA
  titulo: string;
  descripcion: string;
  numero_de_preguntas: string;
  puntos_maximos: string;
  categoria_id:number;
  activo:boolean;

  //ACCESO A CATEGORIA SERVICE Y EXAMEN SERVICE PARA COMUNICAR CON EL SERVICE, EL SNACKBAR PARA ENVIAR MENSAJES
  constructor(
    private categoriaService: CategoriaService,
    private matSnackbar: MatSnackBar,
    private examenService:ExamenService,
    private router:Router
  ) {}

  //AL CARGAR EL COMPONENTE, OBTENEMOS EL LISTADO DE CATEGORIAS Y SUSCRIBIMOS AL MÉTODO
  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato: Categoria[]) => {
        this.categorias = dato;
        console.log(dato);
        console.log(this.categorias);
      },
      (error) => {
        console.log('error');
        Swal.fire('Error!!', 'Error al cargar las categorías', 'error');
      }
    );
  }

  //RECIBIMOS EL FORMULARIO VALIDADO DESDE LA PLANTILLA
  submitForm() {

    //CREAMOS UN OBJETO EXAMEN
    let examen = new Examen();
    //Y LE ASIGNAMOS LOS ATRIBUTOS DEL FORMULARIO, ELIMINANDO ESPACIOS ADICIONALES A LAS CADENAS
    examen.titulo = this.titulo.trim();
    examen.descripcion = this.descripcion.trim();
    examen.numero_de_preguntas = parseInt(this.numero_de_preguntas);
    examen.puntos_maximos= parseInt(this.puntos_maximos);

    //CREAMOS UN OBJETO CATEGORIA DONDE ASIGNAMOS EL ID DE LA CATEGORIA A LA CUAL SE AGREGARÁ EL EXÁMEN
    let categoria = new Categoria();

    categoria.id_categoria = this.categoria_id;

    examen.categoria = categoria;

    if(this.activo){
      examen.activo = 1;
    } else {
      examen.activo = 0;
    }

   //ENVAIAMOS EL EXAMEN AL SERVICE
   this.examenService.agregarExamen(examen).subscribe(
    (data ) => {
      Swal.fire('Examen agregado!', 'Se ha guardado exitosamente', 'success');
      this.router.navigate(['/admin/examenes']);
    }, (error) => {
      this.matSnackbar.open(
        '¡Ha ocurrido un error al agregar el examen!',
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
