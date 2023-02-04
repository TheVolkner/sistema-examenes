import { Examen } from './Examen.model';
//CREAMOS UN MODELO PARA PREGUNTAS EL CÚAL SE COMUNICARÁ CON EL SERVICE
export class Pregunta{

  public pregunta_id:number = 0;
  public contenido:string = '';
  public imagen:string = 'img.png';
  public opcion1:string = '';
  public opcion2:string = '';
  public opcion3:string = '';
  public opcion4:string = '';
  public respuesta:string = '';
  public respuestaDada:string = '';
  public examen:Examen;

  constructor(){}
}
