import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Categoria } from './../../../models/Categoria.model';
import { CategoriaService } from './../../../services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Examen } from './../../../models/Examen.model';
import { ExamenService } from './../../../services/examen.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './actualizar-examen.component.html',
  styleUrls: ['./actualizar-examen.component.css']
})
export class ActualizarExamenComponent implements OnInit{

  //GENERAMOS UN ATRIBUTO PARA OBTENER EL ID DEL EXAMEN A ACTUALIZAR Y DE LA CATEGORIA
  examenId:number = 0;

  //UN MODEL EXAMEN PARA OBTENER LOS DATOS DE EXAMEN DESDE EL SERVICE
  examen:Examen = new Examen();

  //UN MODEL CATEGORIA PARA OBTENER LOS DATOS DE LA CATEGORIA LIGADA AL EXÁMEN
  categorias:Categoria[];

  //HACEMOS UN BOOLEAN PARA CONTROLAR EL BOTON DE ACTIVO DEL EXAMEN
  activo:boolean = true;

  //ACCEDEMOS A ACTIVATED ROUTE QUE ES EL QUE NOS PERMITE RECIBIR LOS PARÁMETROS DE LOS ROUTER LINK
  constructor(private route:ActivatedRoute,
    private examenService:ExamenService,
    private matSnackbar:MatSnackBar,
    private categoriaService:CategoriaService,
    private router:Router){}


  //AL CARGAR EL COMPONENTE OBTENEMOS DEL PATH EL PARÁMETRO ENVIADO
  ngOnInit(): void {
    //OBTENEMOS EL ATRIBUTO DEL PATH Y LUEGO MANDAMOS A SOLICITAR EL EXAMEN SEGUN ESE ID EN EL SERVICE
     this.examenId = this.route.snapshot.params['id_examen'];
     this.examenService.obtenerExamenPorId(this.examenId).subscribe(
      (data:Examen) => {
        //INICIALIZAMOS EL MODELO DEL COMPONENTE CON LA RESPUESTA
        this.examen = data;
        //COMPROBAMOS EL NUMERO DEL CAMPO ACTIVO, PARA ASIGNAR EL BOOLEAN AL ATRIBUTO DEL TOGGLE BUTTON
        if(this.examen.activo > 0){

          this.activo = true;
        } else {
          this.activo = false;
        }

        //SI HAY UN ERROR, LO MOSTRAMOS
      },(error) => {
        this.matSnackbar.open(
          '¡Ha ocurrido un error al listar los datos del exámen!',
          'Aceptar',
          {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          }
        );
      }
     );

     //SOLICITAMOS LAS CATEGORIAS DEL SERVICE
     this.categoriaService.listarCategorias().subscribe(
      (data:Categoria[]) => {

        this.categorias = data;

      },(error) => {
        this.matSnackbar.open(
          '¡Ha ocurrido un error al listar las categorias!',
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

  //ENVIAMOS EL FORMULARIO CON EL EXAMEN A MODIFICAR LISTO AL SERVICE
    submitForm(){

      //LIMPIAMOS LOS ESPACIADOS EN LOS CAMPOS EN CASO DE SER NECESARIO
      this.examen.titulo = this.examen.titulo.trim();
      this.examen.descripcion = this.examen.descripcion.trim();

      //CREAMOS EL OBJETO CATEGORIA CON LA MISMA O LA NUEVA ID DE LA CATEGORIA DEL EXAMEN
      let categoria = new Categoria();
      categoria.id_categoria = this.examen.categoria.id_categoria;
      this.examen.categoria = categoria;

      //COMPROBAMOS EL TOGGLE BUTTON Y SU VALOR BOOLEAN, PARA ASIGNARLE UN NUMERO AL ATRIBUTO DEL EXAMEN
      if(this.activo){
        this.examen.activo = 1;
      } else {
        this.examen.activo = 0;
      }

      this.examenService.actualizarExamen(this.examen).subscribe(
        (data) => {
          Swal.fire('¡Examen actualizado!', 'Se ha modificado exitosamente', 'success');
          this.router.navigate(['/admin/examenes']);
        },(error) => {
          this.matSnackbar.open(
            '¡Ha ocurrido un error al guardar el exámen modificado!',
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
