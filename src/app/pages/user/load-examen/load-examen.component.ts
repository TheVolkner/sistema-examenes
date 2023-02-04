import { Examen } from './../../../models/Examen.model';
import { ExamenService } from './../../../services/examen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from './../../../models/Categoria.model';
import { CategoriaService } from './../../../services/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrls: ['./load-examen.component.css']
})
//ESTE COMPONENTE SE ENCARGARÁ DE DESPLEGAR EXAMENES VISTA DESDE EL PANEL DE USUARIO
export class LoadExamenComponent implements OnInit{

  //GENERAMOS UN ATRIBUTO PARA RECIBIR EL ID DE LA CATEGORIA PROVENIENTE DEL PATH
  categoria_id:number;

  //GENERAMOS UN MODELO DE EXAMEN PARA EL RESULTADO DEL SERVICE
  examenes:Examen[];

  //ACCEDEMOS ACTIVATED ROUTE PARA RECIBIR EL PARAMETRO DEL PATH,EL CATEGORIA SERVICE Y SNACKBAR
  constructor(private route:ActivatedRoute,
    private examenService:ExamenService,
    private matSnackBar:MatSnackBar){}

  ngOnInit(): void {

    //NOS SUSCRIBIMOS A LOS PARÁMETROS DEL PATH, ANTE CUALQUIER CAMBIO DE VALOR. YA QUE LO ESTAREMOS
    //MODIFICANDO CONSTANTEMENTE ENVIANDO DIVERSOS ID'S
    this.route.params.subscribe((params) => {

      this.categoria_id = params['categoria_id'];

  //COMPROBAMOS SI SE ESTÁ INTENTANDO LISTAR TODOS LOS EXAMENES, O EXAMENES PERTENECIENTES A UNA CATEGORIA
  if(this.categoria_id == 0){
    console.log('Cargando todos los exámenes');
    this.examenService.listarCuestionarios().subscribe(
      (data:Examen[]) => {
        this.examenes = data;
        this.examenes = this.examenes.filter(
          (examen:Examen) => examen.activo == 1
        );
      },(error) => {
        this.matSnackBar.open(
          '¡Ha ocurrido un error en el sistema al listar los exámenes!',
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
  } else {
    console.log('Cargando un exámen en particular');
    this.examenService.obtenerExamenesPorIdCategoria(this.categoria_id).subscribe(
      (data:Examen[]) => {

        this.examenes = data;
        console.log(this.examenes);
        this.examenes = this.examenes.filter(
          (examen:Examen) => examen.activo == 1
        );
      },(error) => {
        this.matSnackBar.open(
          '¡Ha ocurrido un error en el sistema al listar los exámenes según la categoría indicada!',
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
