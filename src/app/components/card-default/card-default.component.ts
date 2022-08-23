import { Component, OnInit, Input } from '@angular/core';
import { Experience } from '../../mocks/experience';
import { Academics } from '../../mocks/academic';

@Component({
  selector: 'app-card-default',
  templateUrl: './card-default.component.html',
  styleUrls: ['./card-default.component.css']
})
export class CardDefaultComponent implements OnInit {

  // @Input() pasero:  = new ();

  @Input() imageCard: string = "";
  @Input() altCard: string = "imagen ilustrativa";

  @Input() apuntar: string = "";
  @Input() type1: string = "1";
  @Input() type2: string = "2";
  // @Input() btnEditImgSetID: string = "";
  // @Input() btnEditSetID: string = "";
  // atributos en comun
  @Input() titleCard: string = "";
  @Input() descripcionCard: string = "";
  @Input() desde: string = "";
  @Input() hasta: string = "";
  @Input() tareas: string[] = [];

  //atributos particulares de experiencia laboral
  @Input() refe_per: string = "";
  @Input() refe_tel: string = "";

  @Input() dataEnter: Experience = new Experience();
  // @Input() dataEnter2: Academics = new Academics();

  constructor() { }

  ngOnInit(): void {
    // console.log("apuntar:"+this.apuntar);
    // console.log("dataEnter: ");
    // console.log(this.dataEnter);
  }

}
