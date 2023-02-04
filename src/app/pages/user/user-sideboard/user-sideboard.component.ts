import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from './../../../services/categoria.service';
import { Categoria } from './../../../models/Categoria.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-sideboard',
  templateUrl: './user-sideboard.component.html',
  styleUrls: ['./user-sideboard.component.css']
})
export class UserSideboardComponent implements OnInit{


  categorias:Categoria[];


  constructor(private categoriaService:CategoriaService,
    private matSnackBar:MatSnackBar){}

  ngOnInit(): void {

    this.categoriaService.listarCategorias().subscribe(
      (data:Categoria[]) => {
        this.categorias = data;
      },(error) => {
        this.matSnackBar.open(
          '¡Ha ocurrido un error en el sistema al listar las categorías!',
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




}
