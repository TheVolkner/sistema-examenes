import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute } from '@angular/router';
import { PreguntasService } from './../../../services/preguntas.service';
import { Pregunta } from './../../../models/Pregunta.model';
import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {


  //MODELO DE PREGUNTA Y ATRIBUTO PARA RECIBIR LA VARIABLE DEL PATH
  preguntas:Pregunta[];
  id_examen:number;

  //GENERAMOS LOS ATRIBUTOS PARA LAS ACCIONES A REALIZAR EN ESTE COMPONENTE
  puntosConseguidos:number = 0;
  respuestasCorrectas:number = 0;
  intentos:number = 0;
  enviado:boolean = false;

  //CREAMOS UN ATRIBUTO PARA UN TIMER QUE DEFINIRÁ EL TIEMPO EN QUE SE REALIZA EL EXÁMEN
  timer:number = 0;

  //CON EL LOCATION STRATEGY PODEMOS BLOQUEAR EL USUARIO PARA QUE NO SALGA DE LA PÁGINA MIENTRAS HACE EL EXÁMEN
  //ACCEDEMOS TAMBIÉN AL SERVICE DE PREGUNTAS, AL ROUTE PARA EL PARÁMETRO DEL PATH Y AL SNACK BAR.
  constructor(private locationSt:LocationStrategy,
    private preguntaService:PreguntasService,
    private route:ActivatedRoute,
    private matSnackBar:MatSnackBar){

    //LLAMAMOS AL MÉTODO DECLARADADO ABAJO QUE BLOQUEA LOS BOTONES DE RETROCESO
    this.prevenirElBotonDeRetroceso();

    //OBTENEMOS EL ID DEL EXAMEN
    this.id_examen = this.route.snapshot.params['id_examen'];

    //BUSCAMOS LAS PREGUNTAS DE ESE EXÁMEN
    this.preguntaService.buscarPreguntasPorExamenId(this.id_examen).subscribe(
      (data:Pregunta[]) => {
        this.preguntas = data;
        console.log(this.preguntas);
        //LIMPIAMOS LA RESPUESTA DE CADA PREGUNTA PARA QUE EL CLIENTE LA INDIQUE
        this.preguntas.forEach((p:Pregunta) => {
           p.respuestaDada = '';
        });
        //OBTENEMOS EL TIEMPO QUE DURARÁ EL EXÁMEN PARA INICIAR EL TIMER Y LO TRANSFORMAMOS A SEGUNDOS.
        this.timer = this.preguntas.length * 2 * 60;
        this.iniciarTimer();

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
  }

  //SI EL CLIENTE DA CLICK EN ENVIAR, SE LE MOSTRARÁ ESTE SWEET ALERT PARA CONFIRMAR SU PETICIÓN, Y SI ENVIA LLAMA AL OTRO MÉTODO
  enviarCuestionario(){

    Swal.fire({
      title: '¿Quieres enviar el exámen?',
      text: '¡Asegurate de comprobar previamente todas tus respuestas!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Regresar',
    }).then((result) => {

      if (result.isConfirmed) {

        this.procesarFormulario();
      }
    });
  }

  //ESTE MÉTODO SE ENCARGA DE ENVIAR EL FORMULARIO, ES LLAMADO YA SEA POR EL CLIENTE O POR EL TIMER AL FINALIZAR EL CONTEO
  procesarFormulario(){

     this.preguntaService.evaluarExamen(this.preguntas).subscribe(
      (data:any) => {

         this.puntosConseguidos = data.puntosMaximos;
         this.respuestasCorrectas = data.respuestasCorrectas;
         this.enviado = true;
      },(error) => {
        this.matSnackBar.open(
          '¡Ha ocurrido un error al validar el exámen en el servidor!',
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

  //INICIALIZAMOS EL TIMER DEL CUESTIONARIO
  iniciarTimer(){

    //CREAMOS UN ATRIBUTO DONDE GUARDAREMOS UN INTERVAL QUE SE CICLARÁ CADA SEGUNDO
    //EL CÚAL COMPROBARÁ SI EL TIMER AÚN SIGUE SIN LLEGAR A 0, Y LO DECREMENTA.
    let t = window.setInterval(() => {
      //COMPROBAMOS EL TIMER
        if(this.timer <= 0){

          //ENVIAMOS EL FORMULARIO Y FINALIZAMOS EL INTERVAL
            this.procesarFormulario();
            clearInterval(t);
        } else {

          //LE RESTAMOS DE 1 EN 1 AL TIMER
          this.timer--;
        }
    },1000);
  }

  //TRANSFORMAMOS LA HORA DEL TIMER A MINUTOS Y A SEGUNDOS RESPECTIVAMENTE
  obtenerHoraFormateada(){

    //CON MATH FLOOR NOS ENCARGAMOS DE QUE LAS DIVIONES NO EXACTAS DEL TIMER CON 60 SOLO SE MUESTRE LOS ENTEROS
    let mm = Math.floor(this.timer/60);
    //PRIMERO MULTIPLICAMOS LOS MINUTOS POR 60, Y ESE RESULTADO SE LO RESTAMOS A LO QUE TENGA EL TIMER.
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} seg`;
  }

  prevenirElBotonDeRetroceso(){

    //CON ESTE CÓDIGO BLOQUEAMOS EL BOTÓN DE RETROCEDER EN EL NAVEGADOR
    history.pushState(null,null,location.href);
    this.locationSt.onPopState(() => {

      history.pushState(null,null,location.href);
    });
  }

  //MÉTODO PARA IMPRIMIR UN SCREENSHOT DE LA VENTANA DEL RESULTADO LLAMADO DESDE EL BOTÓN
  imprimirPagina(){

    //CON ESTE MÉTODO HACEMOS ESA TAREA
    window.print();
  }
}
