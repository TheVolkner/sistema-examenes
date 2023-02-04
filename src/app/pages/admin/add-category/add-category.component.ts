import { Router } from '@angular/router';
import { CategoriaService } from './../../../services/categoria.service';
import  Swal  from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Categoria } from './../../../models/Categoria.model';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  //ATRIBUTOS VINCULADOS AL FORMULARIO
  titulo:string;
  descripcion:string;

  //OBJETO CATEGORIA QUE SE ENVIARÁ AL SERVICE
  categoria:Categoria;

  constructor(private categoriaService:CategoriaService,
    private matSnackBar:MatSnackBar,
    private router:Router){}

  //ESTE MÉTODO SE LLAMARÁ AL ENVIAR LA CATEGORÍA A GUARDAR, Y SE ENCARGARÁ DE VALIDAR Y ENVIAR EL FORMULARIO
  //AL SERVICE
  formSubmit(form:NgForm){

  //AL ESTAR VINCULADOS CON LOS CAMPOS DEL FORMULARIO, USAMOS LOS MISMOS ATRIBUTOS PARA INICIALIZAR EL OBJETO, PUES YA ESTÁN VALIDADOS
   this.categoria.titulo = this.titulo;
   this.categoria.descripcion = this.descripcion;

    //ENVIAMOS LOS CAMPOS DEL FORMULARIO(QUE SON UN OBJETO CATEGORIA)
    this.categoriaService.agregarCategoria(this.categoria).subscribe(
      (data ) => {
        //SI SE GUARDÓ CORRECTAMENTE,MOSTRAMOS UN MENSAJE DE SUCCESS CON SWEET ALERT
        Swal.fire(
          '¡Categoría agregada!',
          'Su categoría ha sido guardada exitosamente.',
          'success'
        );
        this.router.navigate(['/admin/categorias']);
        //SI HUBO UN ERROR, LO INDICAMOS CON SNACK BAR
      },(error) => {

        this.matSnackBar.open(
          '¡Ha ocurrido un error en el sistema al iniciar sesión!',
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
      this.matSnackBar.open(
        '¡Recuerde indicar el nombre de la categoría y una descripción válida!',
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
