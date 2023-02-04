import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { Categoria } from './../../../models/Categoria.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit{

  //GENERAMOS UN ARREGLO DE OBJETOS CATEGORÍA PARA PODER RECIBIR LOS QUE NOS ENVIARÁ EL BACKEND
  categorias: Categoria[];


  //OBTENEMOS EL SERVICIO DE CATEGORIAS
  constructor(private categoriaService:CategoriaService){ }

  //AL CARGAR EL COMPONENTE OBTENEMOS LAS CATEGORIAS Y NOS SUBSCRIBIMOS PARA CUALQUIER CAMBIO
  ngOnInit(): void {

    this.categoriaService.listarCategorias().subscribe(
      (data:Categoria[]) => {

        this.categorias = data;
        console.log(this.categorias);
      },
      (error) => {
        console.log('error');
        Swal.fire('Error!!','Error al cargar las categorías','error');
      }
    );
  }

}
