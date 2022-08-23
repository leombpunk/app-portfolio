import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
//la funcion de este servicio es sencillamente informar a otro componente
//algun evento, el que sea, el que me salga de la punta de la polla
@Injectable({
  providedIn: 'root'
})
export class WalkietalkieService {

  private informarUsuId:Subject<number> = new Subject();
  private usuario_id: number = 0;

  //informo cuando actualizar el componente sections 
  //especificamente la biografia/perfil
  private informarBio:Subject<boolean> = new Subject();
  private booleanBio: boolean = false;

  private informarExpe:Subject<boolean> = new Subject();
  private booleanExpe: boolean = false;

  constructor() { }

  //aca es donde escucha? (donde hace es subscribe)
  informarBio$ = this.informarBio.asObservable();
  informarExpe$ = this.informarExpe.asObservable();

  informarUsuId$ = this.informarUsuId.asObservable();

  //comandos del servicio
  setUsuarioId(value:number){
    this.usuario_id = value;
    // console.log("walkie usuario_id: "+this.usuario_id);
    this.informarUsuId.next(this.usuario_id);
  }

  actualizarBio(value:boolean) {
    this.booleanBio = value;
    console.log("actualizarBio: "+this.booleanBio);
    this.informarBio.next(this.booleanBio);
  }
  actualiceBio(value:boolean) {
    this.booleanBio = value;
    console.log("actualiceBio: "+this.booleanBio);
    this.informarBio.next(this.booleanBio);
  }

  actualizarExpe(value:boolean){
    console.log("actualizarExpe: "+value);
    this.informarExpe.next(value);
  }

  actualiceExpe(value:boolean){
    console.log("actualiceExpe: "+value);
    this.informarExpe.next(value);
  }
}
