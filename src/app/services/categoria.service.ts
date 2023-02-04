import { Categoria } from './../models/Categoria.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
//ESTE SERVICIO SE ENCARGA DE COMUNICARSE CON EL CONTROLADOR DE CATEGORIA EN EL BACK-END
export class CategoriaService {

  //OBTENEMOS EL SERVICIO PARA HACER PETICIONES HTTP
  constructor(private httpClient:HttpClient) { }

  //LISTAMOS TODAS LAS CATEGORÍAS
 listarCategorias(){

  return this.httpClient.get(`${baseUrl}/categoria`);
 }

 //GUARDAMOS UNA CATEGORIA
 agregarCategoria(categoria:Categoria){

  return this.httpClient.post(`${baseUrl}/categoria/agregar`,categoria);
 }

 //LISTAMOS CATEGORIA SEGÚN SU ID
 buscarCategoriaPorId(id_categoria:number){

  return this.httpClient.get(`${baseUrl}/categoria/${id_categoria}`);
 }
}

