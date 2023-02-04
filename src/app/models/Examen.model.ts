import { Categoria } from './Categoria.model';
export class Examen{

  public titulo:string = '';
  public descripcion:string = '';
  public id_examen:number = 0;
  public numero_de_preguntas:number = 0;
  public puntos_maximos:number = 0;
  public categoria:Categoria;
  public activo:number = 1;

  constructor(){}

}
