import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-add-edit-biography',
  templateUrl: './modal-add-edit-biography.component.html',
  styleUrls: ['./modal-add-edit-biography.component.css']
})
export class ModalAddEditBiographyComponent implements OnInit {

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
