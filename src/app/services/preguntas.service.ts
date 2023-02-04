import { Pregunta } from './../models/Pregunta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
//ESTE SERVICIO SE COMUNICARÁ CON EL BACK-END Y EL CONTROLADOR DE PREGUNTAS
export class PreguntasService {

  //ACCEDEMOS AL SERVICIO DE HTTP CLIENT
  constructor(private httpClient:HttpClient) { }

  //BUSCAMOS LAS PREGUNTAS SEGÚN EL ID DE SU EXAMEN ASIGNADO
  buscarPreguntasPorExamenId(id_examen:number){

    return this.httpClient.get(`${baseUrl}/preguntas/examen/${id_examen}`);
  }

  //AGREGAMOS UNA NUEVA PREGUNTA AL EXAMEN QUE TENGA ASIGNADO
  agregarPregunta(pregunta:Pregunta){

     return this.httpClient.post(`${baseUrl}/preguntas/agregar`,pregunta);
  }

  //BUSCAMOS PREGUNTA SEGÚN SU ID
  buscarPreguntaPorId(id_pregunta:number){

    return this.httpClient.get(`${baseUrl}/preguntas/${id_pregunta}`)
  }

  //ACTUALIZAR PREGUNTA
  actualizarPregunta(pregunta:Pregunta){

    return this.httpClient.put(`${baseUrl}/preguntas/editar`,pregunta);
  }

  //ELIMINAR PREGUNTA SEGÚN SU ID
  eliminarPregunta(id_pregunta:number){

   return this.httpClient.delete(`${baseUrl}/preguntas/borrar/${id_pregunta}`);
  }

  //MANDAMOS A EVALUAR LAS PREGUNTAS AL BACK-END
  evaluarExamen(preguntas:Pregunta[]){

    return this.httpClient.post(`${baseUrl}/preguntas/evaluar-examen`,preguntas);
  }


}
