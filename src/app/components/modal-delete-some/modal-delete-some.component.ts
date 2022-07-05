import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete-some',
  templateUrl: './modal-delete-some.component.html',
  styleUrls: ['./modal-delete-some.component.css']
})
export class ModalDeleteSomeComponent implements OnInit {
  @Input() descpCard: string = "";

  //inputs utiles para luego
  @Input() idUser: string = ""; //el usuario del cual quiero borrar algo
  @Input() idItem: string = ""; //el item especifico que quiero borrar (si es que pertenece al usuario)
  @Input() idModule: string = ""; //el modulo de donde quiero borrar (de que tabla en la base de datos)
  @Input() idTarget: string = ""; //quiero borrar solo la imagen o la entrada completa

  constructor(private modalActive: NgbActiveModal) { }

  closeModal() {
    this.modalActive.close('Modal Closed');
  }

  dismissModal(){
    this.modalActive.dismiss('Cross click');
  }

  ngOnInit(): void {
  }

}
