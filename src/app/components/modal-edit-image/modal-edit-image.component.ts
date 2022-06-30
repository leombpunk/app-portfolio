import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-edit-image',
  templateUrl: './modal-edit-image.component.html',
  styleUrls: ['./modal-edit-image.component.css']
})
export class ModalEditImageComponent implements OnInit {

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
