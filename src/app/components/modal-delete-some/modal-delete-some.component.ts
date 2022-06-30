import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete-some',
  templateUrl: './modal-delete-some.component.html',
  styleUrls: ['./modal-delete-some.component.css']
})
export class ModalDeleteSomeComponent implements OnInit {

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
