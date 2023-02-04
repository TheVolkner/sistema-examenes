import { Examen } from './../models/Examen.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
//ESTA CLASE ES LA ENCARGADA DE PROCESAR LAS PETICIONES HTTP AL CONTROLADOR DE EXAMEN EN EL BACK-END
export class ExamenService {


  constructor(private httpClient:HttpClient) { }

  //LISTAMOS LOS EXAMENES
  listarCuestionarios(){

    return this.httpClient.get(`${baseUrl}/examen`);
  }

  //AGREGAR EXAMEN
  agregarExamen(examen:Examen){

    return this.httpClient.post(`${baseUrl}/examen/agregar`,examen);
  }

  //ELIMINAMOS UN EXAMEN
  eliminarExamen(id_examen:number){

    return this.httpClient.delete(`${baseUrl}/examen/borrar/${id_examen}`);
  }

  //ACTUALIZAMOS UN EXAMEN
  actualizarExamen(examen:Examen){

    return this.httpClient.put(`${baseUrl}/examen/editar`,examen);
  }

  //OBTENEMOS UN EXAMEN POR ID
  obtenerExamenPorId(id_examen:number){

    return this.httpClient.get(`${baseUrl}/examen/${id_examen}`);
  }

  //OBTENEMOS LISTADO DE EXÁMENES SEGÚN ID DE LA CATEGORÍA
  obtenerExamenesPorIdCategoria(id_categoria:number){

    return this.httpClient.get(`${baseUrl}/examen/categoria/${id_categoria}`);
  }
}
